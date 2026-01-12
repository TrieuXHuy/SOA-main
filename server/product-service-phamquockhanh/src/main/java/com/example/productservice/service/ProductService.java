package com.example.productservice.service;

import com.example.productservice.model.Pagination;
import com.example.productservice.model.Product;
import com.example.productservice.model.ProductImage;
import com.example.productservice.repository.ProductImageRepository;
import com.example.productservice.repository.ProductRepository;
import com.example.productservice.service.ProductTypeService;
import com.example.productservice.service.dto.ProductListResponse;
import com.example.productservice.service.mapper.ProductMapper;
import com.example.productservice.service.dto.ProductRequest;
import com.example.productservice.service.dto.ProductResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ProductImageRepository productImageRepository;

    @Autowired
    private ProductTypeService productTypeService;

    @Autowired
    private ProductMapper productMapper;

    public List<ProductResponse> getAllProducts() {
        List<Product> products = productRepository.findAll();
        return products.stream()
                .map(productMapper::toResponse)
                .collect(Collectors.toList());
    }

    public long countAllProducts() {
        return productRepository.count();
    }

    public Optional<ProductResponse> getProductById(String productID) {
        return productRepository.findById(productID)
                .map(productMapper::toResponse);
    }

    @Transactional
    public ProductResponse createProduct(ProductRequest request) {
        // Validate productTypeID exists
        if (request.getProductTypeID() == null || request.getProductTypeID().isEmpty()) {
            throw new IllegalArgumentException("ProductTypeID is required");
        }
        
        if (!productTypeService.getProductTypeById(request.getProductTypeID()).isPresent()) {
            throw new IllegalArgumentException("ProductTypeID '" + request.getProductTypeID() + "' does not exist. Please select a valid product type.");
        }
        
        Product product = productMapper.toEntity(request);
        
        // Generate productID if not provided
        if (product.getProductID() == null || product.getProductID().isEmpty()) {
            String newProductID = generateProductID();
            product.setProductID(newProductID);
        }
        
        // Set default values
        if (product.getCreatedAt() == null) {
            product.setCreatedAt(java.time.LocalDate.now());
        }
        if (product.getRating() == 0) {
            product.setRating(0.0);
        }
        if (product.getSold() == 0) {
            product.setSold(0);
        }
        // View (inventory) is set from request, no need to override
        if (product.getSale() == 0) {
            product.setSale(0.0f);
        }
        
        // Clear images list to avoid cascade conflicts during save
        product.setImages(new ArrayList<>());
        
        // Save product first (without images)
        product = productRepository.saveAndFlush(product);

        // Save images separately after product is saved
        if (request.getImages() != null && !request.getImages().isEmpty()) {
            List<ProductImage> imageEntities = new ArrayList<>();
            for (String url : request.getImages()) {
                ProductImage img = new ProductImage();
                img.setId(UUID.randomUUID().toString());
                img.setImageUrl(url);
                img.setProduct(product);
                imageEntities.add(img);
            }

            // Save all images at once
            productImageRepository.saveAll(imageEntities);
        }

        // Reload product with images from database
        product = productRepository.findById(product.getProductID())
                .orElse(product);

        return productMapper.toResponse(product);
    }

    @Transactional
    public ProductResponse updateProduct(String productID, ProductRequest request) {
        Optional<Product> existing = productRepository.findById(productID);
        if (existing.isEmpty()) return null;

        Product product = existing.get();
        
        // Update product fields (excluding images)
        product.setProductName(request.getProductName());
        product.setImportPrice(request.getImportPrice());
        product.setExportPrice(request.getExportPrice());
        product.setShelfLife(request.getShelfLife());
        product.setProductTypeID(request.getProductTypeID());
        product.setDescription(request.getDescription());

        // Get existing images
        List<ProductImage> existingImages = productImageRepository.findByProduct_ProductID(productID);
        List<String> existingUrls = existingImages.stream()
                .map(ProductImage::getImageUrl)
                .collect(Collectors.toList());

        // Get new image URLs
        List<String> newUrls = request.getImages() != null ? request.getImages() : List.of();

        // Find images to delete (in existing but not in new)
        List<ProductImage> imagesToDelete = existingImages.stream()
                .filter(img -> !newUrls.contains(img.getImageUrl()))
                .collect(Collectors.toList());

        // Delete old images from database
        if (!imagesToDelete.isEmpty()) {
            productImageRepository.deleteAll(imagesToDelete);
        }

        // Find new images to add (in new but not in existing)
        List<String> urlsToAdd = newUrls.stream()
                .filter(url -> !existingUrls.contains(url))
                .collect(Collectors.toList());

        // Create final reference for use in lambda
        final Product productForImages = product;

        // Create new ProductImage entities for new URLs
        List<ProductImage> newImageEntities = urlsToAdd.stream()
                .map(url -> {
                    ProductImage img = new ProductImage();
                    img.setId(UUID.randomUUID().toString());
                    img.setImageUrl(url);
                    img.setProduct(productForImages);
                    return img;
                }).collect(Collectors.toList());

        // Save new images
        if (!newImageEntities.isEmpty()) {
            productImageRepository.saveAll(newImageEntities);
        }

        // Reload product with updated images
        product = productRepository.findById(productID).orElse(product);
        return productMapper.toResponse(product);
    }

    @Transactional
    public void deleteProduct(String productID) {
        // Delete all images first (cascade should handle this, but being explicit)
        List<ProductImage> images = productImageRepository.findByProduct_ProductID(productID);
        if (!images.isEmpty()) {
            productImageRepository.deleteAll(images);
        }
        // Delete product (cascade will also delete images)
        productRepository.deleteById(productID);
    }

    @Transactional
    public void updateProductInventory(String productID, int quantitySold) {
        Optional<Product> productOpt = productRepository.findById(productID);
        if (productOpt.isPresent()) {
            Product product = productOpt.get();
            // Increase sold count
            product.setSold(product.getSold() + quantitySold);
            // Decrease view (inventory) count
            int newView = product.getView() - quantitySold;
            // Ensure view doesn't go below 0
            product.setView(Math.max(newView, 0));
            productRepository.save(product);
        } else {
            throw new RuntimeException("Product not found: " + productID);
        }
    }

    public ProductListResponse getPaginatedProducts(int page, int limit, String sortBy, String orderBy, Integer priceMin, Integer priceMax) {
        List<Product> filtered = productRepository.findAll().stream()
                .filter(p -> priceMin == null || p.getExportPrice() >= priceMin)
                .filter(p -> priceMax == null || p.getExportPrice() <= priceMax)
                .sorted((p1, p2) -> {
                    int cmp = 0;
                    switch (sortBy) {
                        case "createdAt":
                            cmp = p1.getCreatedAt().compareTo(p2.getCreatedAt());
                            break;
                        case "sold":
                            cmp = Integer.compare(p1.getSold(), p2.getSold());
                            break;
                        case "view":
                            cmp = Integer.compare(p1.getView(), p2.getView());
                            break;
                        case "exportPrice":
                            cmp = Integer.compare(p1.getExportPrice(), p2.getExportPrice());
                            break;
                        default:
                            cmp = 0;
                    }
                    return orderBy.equalsIgnoreCase("asc") ? cmp : -cmp;
                })
                .collect(Collectors.toList());

        int start = Math.min((page - 1) * limit, filtered.size());
        int end = Math.min(start + limit, filtered.size());
        List<Product> pageContent = filtered.subList(start, end);

        List<ProductResponse> dtoList = pageContent.stream()
                .map(productMapper::toResponse)
                .collect(Collectors.toList());

        Pagination pagination = new Pagination();
        pagination.setPage(page);
        pagination.setLimit(limit);






        pagination.setPageSize((int) Math.ceil((double) filtered.size() / limit));

        return new ProductListResponse(dtoList, pagination);
    }

    /**
     * Generate next productID in format SP### (e.g., SP001, SP002, ...)
     */
    private String generateProductID() {
        long count = productRepository.count();
        // Find the highest existing productID
        List<Product> allProducts = productRepository.findAll();
        int maxNumber = 0;
        
        for (Product p : allProducts) {
            String id = p.getProductID();
            if (id != null && id.startsWith("SP") && id.length() == 5) {
                try {
                    int num = Integer.parseInt(id.substring(2));
                    if (num > maxNumber) {
                        maxNumber = num;
                    }
                } catch (NumberFormatException e) {
                    // Ignore invalid IDs
                }
            }
        }
        
        int nextNumber = maxNumber + 1;
        return String.format("SP%03d", nextNumber);
    }
}
