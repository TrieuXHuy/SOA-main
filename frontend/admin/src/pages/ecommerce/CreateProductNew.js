import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../constants/path";
import {
    Box,
    Button,
    TextField,
    Typography,
    CircularProgress
} from "@mui/material";
import ProductImageUploader from "../../components/ProductImageUploader";

export default function CreateProductNew() {
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [product, setProduct] = useState({
        productName: "",
        productTypeID: "",
        exportPrice: 0,
        shelfLife: 0,
        description: "",
        images: []
    });

    const handleChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        if (!product.productName || !product.productTypeID) {
            alert("Please fill in required fields");
            return;
        }

        setLoading(true);
        try {
            const payload = {
                productName: product.productName,
                exportPrice: Number(product.exportPrice),
                shelfLife: Number(product.shelfLife),
                productTypeID: product.productTypeID,
                description: product.description || "",
                images: product.images || []
            };

            await axios.post(`${API_URL}/products`, payload);
            history.push("/app/ecommerce");
        } catch (error) {
            console.error("Failed to create product:", error);
            alert("Failed to create product: " + (error.response?.data?.message || error.message));
        } finally {
            setLoading(false);
        }
    };

    // Generate a temporary product code for image uploads
    // This will be used to organize images in MinIO before product is created
    const [tempProductCode] = useState(() => `TEMP-${Date.now()}`);

    return (
        <Box p={4}>
            <Typography variant="h5" gutterBottom>Create New Product</Typography>
            <Box display="flex" flexDirection="column" gap={3} maxWidth={800}>
                <TextField
                    label="Product Name *"
                    name="productName"
                    value={product.productName}
                    onChange={handleChange}
                    fullWidth
                    required
                />
                <TextField
                    label="Category (Product Type ID) *"
                    name="productTypeID"
                    value={product.productTypeID}
                    onChange={handleChange}
                    fullWidth
                    required
                />
                <TextField
                    label="Export Price *"
                    name="exportPrice"
                    value={product.exportPrice}
                    type="number"
                    onChange={handleChange}
                    fullWidth
                    required
                />
                <TextField
                    label="Shelf Life (months)"
                    name="shelfLife"
                    value={product.shelfLife}
                    type="number"
                    onChange={handleChange}
                    fullWidth
                />
                <TextField
                    label="Description"
                    name="description"
                    value={product.description}
                    multiline
                    rows={4}
                    onChange={handleChange}
                    fullWidth
                />
                <ProductImageUploader
                    productCode={tempProductCode}
                    images={product.images}
                    onChange={(newImages) => setProduct({ ...product, images: newImages })}
                />
                <Box display="flex" gap={2}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSubmit}
                        disabled={loading}
                    >
                        {loading ? <CircularProgress size={24} /> : "Create Product"}
                    </Button>
                    <Button
                        variant="outlined"
                        onClick={() => history.push("/app/ecommerce")}
                        disabled={loading}
                    >
                        Cancel
                    </Button>
                </Box>
            </Box>
        </Box>
    );
}

