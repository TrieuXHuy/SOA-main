import React, { useState, useEffect } from "react";
import {
    Grid,
    TextField as Input,
    CircularProgress,
    Box,
    Card,
    CardContent
} from "@mui/material";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../constants/path";
import Widget from "../../components/Widget";
import { Typography, Button } from "../../components/Wrappers";

export default function ProductTypeForm({ isEdit = false }) {
    const { id } = useParams();
    const history = useHistory();
    const [loading, setLoading] = useState(isEdit);
    const [submitting, setSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        productTypeID: "",
        productTypeName: "",
        description: ""
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (isEdit && id) {
            const fetchProductType = async () => {
                try {
                    setLoading(true);
                    const response = await axios.get(`${API_URL}/product-types/${id}`);
                    setFormData(response.data);
                } catch (err) {
                    console.error("Lỗi tải danh mục:", err);
                } finally {
                    setLoading(false);
                }
            };
            fetchProductType();
        }
    }, [isEdit, id]);

    const validateForm = () => {
        const newErrors = {};
        if (!formData.productTypeID.trim()) {
            newErrors.productTypeID = "Mã danh mục không được để trống";
        }
        if (!formData.productTypeName.trim()) {
            newErrors.productTypeName = "Tên danh mục không được để trống";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ""
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        try {
            setSubmitting(true);
            if (isEdit) {
                await axios.put(`${API_URL}/product-types/${id}`, formData);
            } else {
                await axios.post(`${API_URL}/product-types`, formData);
            }
            history.push("/app/product-type");
        } catch (err) {
            console.error("Lỗi lưu danh mục:", err);
            alert("Lỗi khi lưu danh mục: " + (err.response?.data?.message || err.message));
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="300px">
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Widget
                    disableWidgetMenu
                    header={
                        <Typography variant="h6">
                            {isEdit ? "Sửa danh mục" : "Tạo danh mục mới"}
                        </Typography>
                    }
                >
                    <Card>
                        <CardContent>
                            <form onSubmit={handleSubmit}>
                                <Grid container spacing={3}>
                                    <Grid item xs={12}>
                                        <Input
                                            fullWidth
                                            label="Mã danh mục"
                                            name="productTypeID"
                                            value={formData.productTypeID}
                                            onChange={handleChange}
                                            disabled={isEdit}
                                            error={!!errors.productTypeID}
                                            helperText={errors.productTypeID}
                                            placeholder="VD: DM001"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Input
                                            fullWidth
                                            label="Tên danh mục"
                                            name="productTypeName"
                                            value={formData.productTypeName}
                                            onChange={handleChange}
                                            error={!!errors.productTypeName}
                                            helperText={errors.productTypeName}
                                            placeholder="VD: Thực phẩm tươi sống"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Input
                                            fullWidth
                                            multiline
                                            rows={4}
                                            label="Mô tả"
                                            name="description"
                                            value={formData.description}
                                            onChange={handleChange}
                                            placeholder="Nhập mô tả danh mục..."
                                        />
                                    </Grid>
                                    <Grid item xs={12} display="flex" gap={2}>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            type="submit"
                                            disabled={submitting}
                                        >
                                            {submitting ? <CircularProgress size={24} /> : (isEdit ? "Cập nhật" : "Tạo mới")}
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            color="primary"
                                            onClick={() => history.push("/app/product-type")}
                                            disabled={submitting}
                                        >
                                            Hủy
                                        </Button>
                                    </Grid>
                                </Grid>
                            </form>
                        </CardContent>
                    </Card>
                </Widget>
            </Grid>
        </Grid>
    );
}
