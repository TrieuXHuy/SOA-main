import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import {
    TextField,
    Button,
    Grid,
    Box,
    FormHelperText,
} from "@mui/material";

const validationSchema = Yup.object().shape({
    inventoryID: Yup.string()
        .required("Mã kho là bắt buộc")
        .min(3, "Mã kho phải có ít nhất 3 ký tự"),
    productID: Yup.string()
        .required("Mã sản phẩm là bắt buộc"),
    importedQuantity: Yup.number()
        .required("Số lượng nhập là bắt buộc")
        .min(0, "Số lượng phải >= 0")
        .typeError("Phải là số"),
    exportedQuantity: Yup.number()
        .required("Số lượng xuất là bắt buộc")
        .min(0, "Số lượng phải >= 0")
        .typeError("Phải là số"),
    importDate: Yup.date()
        .required("Ngày nhập là bắt buộc"),
    exportDate: Yup.date()
        .nullable()
        .typeError("Ngày xuất phải là ngày hợp lệ"),
    inventoryStatus: Yup.string()
        .required("Trạng thái là bắt buộc"),
});

export default function InventoryForm({ initialValues, onSubmit, isLoading }) {
    const classes = useStyles();

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
            {({ errors, touched, values }) => (
                <Form>
                    <Grid container spacing={2}>
                        {/* Mã kho */}
                        <Grid item xs={12}>
                            <Field
                                as={TextField}
                                fullWidth
                                label="Mã kho"
                                name="inventoryID"
                                placeholder="INV001"
                                disabled={initialValues.inventoryID !== ""}
                                error={touched.inventoryID && !!errors.inventoryID}
                                helperText={touched.inventoryID && errors.inventoryID}
                            />
                        </Grid>

                        {/* Mã sản phẩm */}
                        <Grid item xs={12}>
                            <Field
                                as={TextField}
                                fullWidth
                                label="Mã sản phẩm"
                                name="productID"
                                placeholder="P001"
                                error={touched.productID && !!errors.productID}
                                helperText={touched.productID && errors.productID}
                            />
                        </Grid>

                        {/* Số lượng nhập */}
                        <Grid item xs={12} sm={6}>
                            <Field
                                as={TextField}
                                fullWidth
                                type="number"
                                label="Số lượng nhập"
                                name="importedQuantity"
                                placeholder="100"
                                error={touched.importedQuantity && !!errors.importedQuantity}
                                helperText={touched.importedQuantity && errors.importedQuantity}
                            />
                        </Grid>

                        {/* Số lượng xuất */}
                        <Grid item xs={12} sm={6}>
                            <Field
                                as={TextField}
                                fullWidth
                                type="number"
                                label="Số lượng xuất"
                                name="exportedQuantity"
                                placeholder="20"
                                error={touched.exportedQuantity && !!errors.exportedQuantity}
                                helperText={touched.exportedQuantity && errors.exportedQuantity}
                            />
                        </Grid>

                        {/* Ngày nhập */}
                        <Grid item xs={12} sm={6}>
                            <Field
                                as={TextField}
                                fullWidth
                                type="date"
                                label="Ngày nhập"
                                name="importDate"
                                InputLabelProps={{ shrink: true }}
                                error={touched.importDate && !!errors.importDate}
                                helperText={touched.importDate && errors.importDate}
                            />
                        </Grid>

                        {/* Ngày xuất */}
                        <Grid item xs={12} sm={6}>
                            <Field
                                as={TextField}
                                fullWidth
                                type="date"
                                label="Ngày xuất"
                                name="exportDate"
                                InputLabelProps={{ shrink: true }}
                                error={touched.exportDate && !!errors.exportDate}
                                helperText={touched.exportDate && errors.exportDate}
                            />
                        </Grid>

                        {/* Trạng thái */}
                        <Grid item xs={12}>
                            <Field
                                as={TextField}
                                fullWidth
                                select
                                label="Trạng thái"
                                name="inventoryStatus"
                                SelectProps={{ native: true }}
                                error={touched.inventoryStatus && !!errors.inventoryStatus}
                                helperText={touched.inventoryStatus && errors.inventoryStatus}
                            >
                                <option value="">-- Chọn trạng thái --</option>
                                <option value="Có sẵn">Có sẵn</option>
                                <option value="Hết hàng">Hết hàng</option>
                                <option value="Đang nhập">Đang nhập</option>
                                <option value="Đang xuất">Đang xuất</option>
                            </Field>
                        </Grid>

                        {/* Thông tin tính toán (readonly) */}
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Tuổi sản phẩm (ngày)"
                                value={values.ageProduct || 0}
                                disabled
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Tồn kho hiện tại"
                                value={
                                    (values.importedQuantity || 0) -
                                    (values.exportedQuantity || 0)
                                }
                                disabled
                            />
                        </Grid>

                        {/* Nút hành động */}
                        <Grid item xs={12}>
                            <Box display="flex" gap={2} justifyContent="flex-end">
                                <Button
                                    type="reset"
                                    variant="outlined"
                                    color="primary"
                                >
                                    Làm mới
                                </Button>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    disabled={isLoading}
                                >
                                    {isLoading ? "Đang xử lý..." : "Lưu"}
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
                </Form>
            )}
        </Formik>
    );
}
