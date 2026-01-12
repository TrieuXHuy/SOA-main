import React from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Grid,
    TextField,
    Divider,
    Box,
} from "@mui/material";
import { Button } from "../../components/Wrappers";

export default function InventoryDetailDialog({ open, onClose, inventory }) {
    if (!inventory) return null;

    const formatDate = (dateString) => {
        if (!dateString) return "N/A";
        return new Date(dateString).toLocaleDateString("vi-VN");
    };

    const remainingStock =
        (inventory.importedQuantity || 0) - (inventory.exportedQuantity || 0);

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>Chi tiết tồn kho</DialogTitle>
            <DialogContent>
                <Box sx={{ pt: 2 }}>
                    <Grid container spacing={2}>
                        {/* Thông tin cơ bản */}
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Mã kho"
                                value={inventory.inventoryID || ""}
                                InputProps={{ readOnly: true }}
                                variant="filled"
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Mã sản phẩm"
                                value={inventory.productID || ""}
                                InputProps={{ readOnly: true }}
                                variant="filled"
                            />
                        </Grid>

                        <Divider sx={{ width: "100%", my: 2 }} />

                        {/* Thông tin nhập/xuất */}
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Số lượng nhập"
                                value={inventory.importedQuantity || 0}
                                InputProps={{ readOnly: true }}
                                variant="filled"
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Số lượng xuất"
                                value={inventory.exportedQuantity || 0}
                                InputProps={{ readOnly: true }}
                                variant="filled"
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Ngày nhập"
                                value={formatDate(inventory.importDate)}
                                InputProps={{ readOnly: true }}
                                variant="filled"
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Ngày xuất"
                                value={formatDate(inventory.exportDate)}
                                InputProps={{ readOnly: true }}
                                variant="filled"
                            />
                        </Grid>

                        <Divider sx={{ width: "100%", my: 2 }} />

                        {/* Thông tin tính toán */}
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Tuổi sản phẩm (ngày)"
                                value={inventory.ageProduct || 0}
                                InputProps={{ readOnly: true }}
                                variant="filled"
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Tồn kho hiện tại"
                                value={remainingStock}
                                InputProps={{ readOnly: true }}
                                variant="filled"
                                sx={{
                                    "& .MuiInputBase-input": {
                                        fontWeight: "bold",
                                        color: remainingStock > 0 ? "green" : "red",
                                    },
                                }}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Trạng thái"
                                value={inventory.inventoryStatus || ""}
                                InputProps={{ readOnly: true }}
                                variant="filled"
                            />
                        </Grid>
                    </Grid>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary" variant="contained">
                    Đóng
                </Button>
            </DialogActions>
        </Dialog>
    );
}
