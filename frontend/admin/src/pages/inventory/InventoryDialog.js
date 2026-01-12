import React, { useState } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    CircularProgress,
    Alert,
} from "@mui/material";
import { Button } from "../../components/Wrappers";
import InventoryForm from "./InventoryForm";
import { createInventory, updateInventory } from "../../services/inventoryService";

export default function InventoryDialog({
    open,
    onClose,
    inventory = null,
    onSuccess,
}) {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const isEditMode = !!inventory;

    const initialValues = inventory || {
        inventoryID: "",
        productID: "",
        importedQuantity: 0,
        exportedQuantity: 0,
        importDate: new Date().toISOString().split("T")[0],
        exportDate: "",
        ageProduct: 0,
        inventoryStatus: "Có sẵn",
        remainingStock: 0,
    };

    const handleSubmit = async (values) => {
        setError("");
        setIsLoading(true);

        try {
            const payload = {
                ...values,
                importedQuantity: parseInt(values.importedQuantity),
                exportedQuantity: parseInt(values.exportedQuantity),
                remainingStock:
                    parseInt(values.importedQuantity) -
                    parseInt(values.exportedQuantity),
            };

            let response;
            if (isEditMode) {
                // Update
                response = await updateInventory(inventory.inventoryID, payload);
            } else {
                // Create
                response = await createInventory(payload);
            }

            if (onSuccess) {
                onSuccess(response);
            }
            onClose();
        } catch (err) {
            console.error("Lỗi:", err);
            setError(
                err.response?.data?.message ||
                    err.message ||
                    "Đã xảy ra lỗi khi lưu dữ liệu"
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>
                {isEditMode ? "Cập nhật tồn kho" : "Thêm tồn kho mới"}
            </DialogTitle>
            <DialogContent>
                {error && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {error}
                    </Alert>
                )}
                {isLoading && <CircularProgress />}
                {!isLoading && (
                    <InventoryForm
                        initialValues={initialValues}
                        onSubmit={handleSubmit}
                        isLoading={isLoading}
                    />
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Hủy
                </Button>
            </DialogActions>
        </Dialog>
    );
}
