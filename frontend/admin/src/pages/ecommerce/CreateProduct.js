import React, { useEffect, useState } from "react";
import {
  Box,
  CircularProgress,
  Grid,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  TextField as Input
} from "@mui/material";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../constants/path";

//context
import {
  getProductsRequest,
  useProductsState,
  updateProduct,
  createProduct,
  getProductsImages
} from "../../context/ProductContext";

//components
import Widget from "../../components/Widget";
import { Typography, Button } from "../../components/Wrappers";
import config from "../../config";
import ProductImageUploader from "../../components/ProductImageUploader";

const CreateProduct = () => {
  const { id } = useParams();
  const context = useProductsState();
  const [productTypes, setProductTypes] = useState([]);
  const [loadingTypes, setLoadingTypes] = useState(false);

  const getId = id => {
    if (!context.products?.products) return -1;
    return context.products.products.findIndex(c => {
      return c.id == id; // eslint-disable-line
    });
  };

  const [localProducts, setLocalProducts] = React.useState(
    context.products?.products?.[getId(id)] || null
  );

  const [newProduct, setNewProduct] = React.useState({
    images: [],
    title: null,
    importPrice: 0,
    price: 0.1,
    description_1: null,
    code: null,
    shelfLife: 12,
    view: 0
  });

  useEffect(() => {
    getProductsRequest(context.setProducts);
    getProductsImages(context.setProducts);
    
    // Load product types
    setLoadingTypes(true);
    axios.get(`${API_URL}/product-types`)
      .then(res => {
        setProductTypes(res.data || []);
      })
      .catch(err => {
        console.error('Không thể tải loại sản phẩm:', err);
      })
      .finally(() => {
        setLoadingTypes(false);
      });
  }, []); // eslint-disable-line

  useEffect(() => {
    if (context.products?.products && id) {
      setLocalProducts(context.products.products[getId(id)]);
    }
  }, [context, id]); // eslint-disable-line

  const history = useHistory();

  const editProduct = e => {
    setLocalProducts({
      ...localProducts,
      [e.target.id]: e.currentTarget.value.split(' ')
    });
  };

  const editNewProduct = e => {
    const value = e.target.value !== undefined ? e.target.value : (e.currentTarget?.value || '');
    setNewProduct({
      ...newProduct,
      [e.target.id || e.target.name]: value
    });
  };

  const getEditProduct = () => {
    updateProduct(localProducts, context.setProducts);
    history.push("/app/ecommerce/management");
  };

  const createNewProduct = async () => {
    // Validate required fields
    if (!newProduct.title || !newProduct.title.trim()) {
      alert('Vui lòng nhập tên sản phẩm');
      return;
    }

    if (!newProduct.code || !newProduct.code.trim()) {
      alert('Vui lòng chọn loại sản phẩm');
      return;
    }

    // Map to API format
    const productData = {
      productName: newProduct.title || '',
      productTypeID: newProduct.code || '',
      importPrice: Number(newProduct.importPrice || 0),
      exportPrice: Number(newProduct.price || 0),
      shelfLife: Number(newProduct.shelfLife || 12),
      description: newProduct.description_1 || '',
      view: Number(newProduct.view || 0),
      images: newProduct.images || []
    };
    
    try {
      const response = await axios.post(`${API_URL}/products`, productData);
      alert('Tạo sản phẩm thành công!');
      history.push("/app/ecommerce/management");
    } catch (error) {
      console.error('Lỗi khi tạo sản phẩm:', error);
      const errorMessage = error.response?.data?.message || error.response?.data?.error || error.message || 'Có lỗi xảy ra';
      alert('Tạo sản phẩm thất bại: ' + errorMessage);
    }
  };

  const isCreateProduct =
    window.location.hash === "#/app/ecommerce/management/create";

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Widget
            title={isCreateProduct ? "Thêm sản phẩm mới" : "Chỉnh sửa sản phẩm"}
            disableWidgetMenu
          >
            {config.isBackend && !context.products?.isLoaded ? (
              <Box
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <CircularProgress size={26} />
              </Box>
            ) : (
              <Box display={"flex"} flexDirection="column" gap={3}>
                {/* Product Images Uploader */}
                <Box>
                  <ProductImageUploader
                    productCode={isCreateProduct ? `TEMP-${Date.now()}` : (localProducts?.id || 'TEMP')}
                    images={isCreateProduct ? (newProduct.images || []) : (localProducts?.images || [])}
                    onChange={(newImages) => {
                      if (isCreateProduct) {
                        setNewProduct({ ...newProduct, images: newImages });
                      } else {
                        setLocalProducts({ ...localProducts, images: newImages });
                      }
                    }}
                    readonly={false}
                  />
                </Box>
                <Box display={"flex"} alignItems={"center"}>
                  <Box width={300}>
                    <Typography variant={"h6"}>Tên sản phẩm</Typography>
                  </Box>
                  <Box width={500}>
                    <Input
                      id="title"
                      margin="normal"
                      variant="outlined"
                      value={
                        isCreateProduct ? (newProduct.title || '') : (localProducts?.title || '')
                      }
                      fullWidth
                      onChange={e =>
                        isCreateProduct ? editNewProduct(e) : editProduct(e)
                      }
                    />
                  </Box>
                </Box>
                <Box display={"flex"} alignItems={"center"}>
                  <Box width={300}>
                    <Typography variant={"h6"}>Giá nhập</Typography>
                  </Box>
                  <Box width={500}>
                    <Input
                      id="importPrice"
                      margin="normal"
                      variant="outlined"
                      value={
                        isCreateProduct ? (newProduct.importPrice || 0) : (localProducts?.importPrice || 0)
                      }
                      type={"number"}
                      fullWidth
                      onChange={e =>
                        isCreateProduct ? editNewProduct(e) : editProduct(e)
                      }
                    />
                  </Box>
                </Box>
                <Box display={"flex"} alignItems={"center"}>
                  <Box width={300}>
                    <Typography variant={"h6"}>Giá bán</Typography>
                  </Box>
                  <Box width={500}>
                    <Input
                      id="price"
                      margin="normal"
                      variant="outlined"
                      value={
                        isCreateProduct ? (newProduct.price || 0) : (localProducts?.price || 0)
                      }
                      type={"number"}
                      fullWidth
                      onChange={e =>
                        isCreateProduct ? editNewProduct(e) : editProduct(e)
                      }
                    />
                  </Box>
                </Box>
                <Box display={"flex"} alignItems={"center"}>
                  <Box width={300}>
                    <Typography variant={"h6"}>Hạn sử dụng (tháng)</Typography>
                  </Box>
                  <Box width={500}>
                    <Input
                      id="shelfLife"
                      margin="normal"
                      variant="outlined"
                      value={
                        isCreateProduct ? (newProduct.shelfLife || 12) : (localProducts?.shelfLife || 12)
                      }
                      type={"number"}
                      fullWidth
                      onChange={e =>
                        isCreateProduct ? editNewProduct(e) : editProduct(e)
                      }
                    />
                  </Box>
                </Box>
                <Box display={"flex"} alignItems={"center"}>
                  <Box width={300}>
                    <Typography variant={"h6"}>Số lượng (Tồn kho)</Typography>
                  </Box>
                  <Box width={500}>
                    <Input
                      id="view"
                      margin="normal"
                      variant="outlined"
                      value={
                        isCreateProduct ? (newProduct.view || 0) : (localProducts?.view || 0)
                      }
                      type={"number"}
                      fullWidth
                      onChange={e =>
                        isCreateProduct ? editNewProduct(e) : editProduct(e)
                      }
                    />
                  </Box>
                </Box>
                <Box display={"flex"} alignItems={"center"}>
                  <Box width={300}>
                    <Typography variant={"h6"}>Mô tả</Typography>
                  </Box>
                  <Box width={500}>
                    <Input
                      id="description_1"
                      margin="normal"
                      variant="outlined"
                      multiline
                      value={
                        isCreateProduct
                          ? (newProduct["description_1"] || '')
                          : (localProducts?.["description_1"] || '')
                      }
                      fullWidth
                      onChange={e =>
                        isCreateProduct ? editNewProduct(e) : editProduct(e)
                      }
                    />
                  </Box>
                </Box>
                <Box display={"flex"} alignItems={"center"}>
                  <Box width={300}>
                    <Typography variant={"h6"}>Danh mục</Typography>
                  </Box>
                  <Box width={500}>
                    <FormControl fullWidth margin="normal">
                      <InputLabel id="product-type-label">Chọn loại sản phẩm</InputLabel>
                      <Select
                        id="code"
                        name="code"
                        labelId="product-type-label"
                        label="Chọn loại sản phẩm"
                        value={
                          isCreateProduct ? (newProduct.code || '') : (localProducts?.code || '')
                        }
                        onChange={e => {
                          const event = {
                            target: {
                              id: 'code',
                              name: 'code',
                              value: e.target.value
                            }
                          };
                          if (isCreateProduct) {
                            editNewProduct(event);
                          } else {
                            editProduct(event);
                          }
                        }}
                        disabled={loadingTypes}
                      >
                        {productTypes.map((type) => (
                          <MenuItem key={type.productTypeID} value={type.productTypeID}>
                            {type.productTypeName} ({type.productTypeID})
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Box>
                </Box>
                <Box display={"flex"} alignItems={"center"}>
                  <Button
                    variant={"contained"}
                    color={"success"}
                    style={{ marginRight: 8 }}
                    onClick={() =>
                      isCreateProduct ? createNewProduct() : getEditProduct()
                    }
                  >
                    {isCreateProduct ? "Lưu sản phẩm" : "Cập nhật"}
                  </Button>
                  <Button
                    variant={"contained"}
                    onClick={() => history.push("/app/ecommerce/management")}
                  >
                    Quay lại
                  </Button>
                </Box>
              </Box>
            )}
          </Widget>
        </Grid>
      </Grid>
    </>
  );
};

export default CreateProduct;