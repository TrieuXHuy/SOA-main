import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../constants/path";
import {
    Box,
    Button,
    CircularProgress,
    TextField,
    Typography
} from "@mui/material";
import ProductImageUploader from "../../components/ProductImageUploader";

export default function EditProduct() {
    const { id } = useParams();
    const history = useHistory();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`${API_URL}/products/${id}`)
            .then(res => {
                setProduct(res.data.data);
            })
            .catch(() => console.error("Failed to fetch product"))
            .finally(() => setLoading(false));
    }, [id]);

    const handleChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        const value = e.target.value;
        const imagesArray = value.split(',').map(url => url.trim());
        setProduct({ ...product, images: imagesArray });
    };

    const handleSubmit = () => {
        const payload = {
            productName: product.productName,
            importPrice: Number(product.importPrice || 0),
            exportPrice: Number(product.exportPrice),
            shelfLife: Number(product.shelfLife),
            productTypeID: product.productTypeID,
            description: product.description,
            view: Number(product.view || 0),
            images: product.images
        };

        axios.put(`${API_URL}/products/${id}`, payload)
            .then(() => {
                history.push("/app/ecommerce");
            })
            .catch(() => console.error("Failed to update product"));
    };

    if (loading) return <CircularProgress />;
    if (!product) return <Typography>Product not found.</Typography>;

    return (
        <Box p={4}>
            <Typography variant="h5" gutterBottom>Edit Product</Typography>
            <Box display="flex" flexDirection="column" gap={2} maxWidth={400}>
                <TextField
                    label="Product Name"
                    name="productName"
                    value={product.productName || ""}
                    onChange={handleChange}
                />
                <TextField
                    label="Category"
                    name="productTypeID"
                    value={product.productTypeID || ""}
                    onChange={handleChange}
                />
                <TextField
                    label="Import Price"
                    name="importPrice"
                    value={product.importPrice || ""}
                    type="number"
                    onChange={handleChange}
                />
                <TextField
                    label="Export Price"
                    name="exportPrice"
                    value={product.exportPrice || ""}
                    type="number"
                    onChange={handleChange}
                />
                <TextField
                    label="Shelf Life (months)"
                    name="shelfLife"
                    value={product.shelfLife || ""}
                    type="number"
                    onChange={handleChange}
                />
                <TextField
                    label="Số lượng (Tồn kho)"
                    name="view"
                    value={product.view || ""}
                    type="number"
                    onChange={handleChange}
                />
                <TextField
                    label="Description"
                    name="description"
                    value={product.description || ""}
                    multiline
                    rows={3}
                    onChange={handleChange}
                />
                <ProductImageUploader
                    productCode={product.productID || id}
                    images={product.images || []}
                    onChange={(newImages) => setProduct({ ...product, images: newImages })}
                />
                <Button variant="contained" color="primary" onClick={handleSubmit}>
                    Save Changes
                </Button>
            </Box>
        </Box>
    );
}
