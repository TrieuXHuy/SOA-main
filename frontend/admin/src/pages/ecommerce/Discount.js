import React, { useState } from "react";
import {
    CircularProgress,
    Grid,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Box,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button
} from "@mui/material";
import Widget from "../../components/Widget";
import { useDiscounts } from "../../hooks/useDiscounts";
import axios from "axios";

export default function Discounts() {
    const {
        discountOrders,
        discountCustomers,
        isLoading,
        setDiscountOrders,
        setDiscountCustomers
    } = useDiscounts();

    const [confirmOpen, setConfirmOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);
    const [deleteType, setDeleteType] = useState(null); // "order" or "customer"

    const handleDelete = (type, id, event) => {
        event.stopPropagation();
        setDeleteType(type);
        setItemToDelete(id);
        setConfirmOpen(true);
    };

    const confirmDelete = async () => {
        try {
            const url = deleteType === "order"
                ? `http://localhost:8080/discount-orders/${itemToDelete}`
                : `http://localhost:8080/discount-customers/${itemToDelete}`;

            await axios.delete(url);

            if (deleteType === "order") {
                setDiscountOrders(prev => prev.filter(d => d.discountOrderID !== itemToDelete));
            } else {
                setDiscountCustomers(prev => prev.filter(d => d.id !== itemToDelete));
            }
        } catch (err) {
            console.error("Xóa thất bại:", err);
        } finally {
            setConfirmOpen(false);
            setItemToDelete(null);
            setDeleteType(null);
        }
    };

    if (isLoading) {
        return (
            <Box display="flex" justifyContent="center" p={4}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Grid container spacing={4} direction="column">
            <Grid item xs={12}>
                <Widget title="Giảm giá đơn hàng">
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Tên chương trình</TableCell>
                                <TableCell>Giá trị</TableCell>
                                <TableCell>Đơn tối thiểu</TableCell>
                                <TableCell>Đơn tối đa</TableCell>
                                <TableCell>Giảm tối đa</TableCell>
                                <TableCell>Ngày bắt đầu</TableCell>
                                <TableCell>Ngày kết thúc</TableCell>
                                <TableCell>Trạng thái</TableCell>
                                <TableCell>Thao tác</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {discountOrders.map((d) => (
                                <TableRow key={d.discountOrderID}>
                                    <TableCell>{d.discountOrderID}</TableCell>
                                    <TableCell>{d.name}</TableCell>
                                    <TableCell>{d.value}</TableCell>
                                    <TableCell>{d.minOrderValue}</TableCell>
                                    <TableCell>{d.maxOrderValue ?? "-"}</TableCell>
                                    <TableCell>{d.maxDiscount}</TableCell>
                                    <TableCell>{d.startDay}</TableCell>
                                    <TableCell>{d.endDay}</TableCell>
                                    <TableCell>{d.status}</TableCell>
                                    <TableCell>
                                        <Box display="flex">
                                            <Button
                                                color="success"
                                                size="small"
                                                variant="contained"
                                                style={{ marginRight: 8 }}
                                                onClick={() => alert(`Sửa ${d.discountOrderID}`)}
                                            >
                                                Sửa
                                            </Button>
                                            <Button
                                                color="secondary"
                                                size="small"
                                                variant="contained"
                                                onClick={(e) => handleDelete("order", d.discountOrderID, e)}
                                            >
                                                Xóa
                                            </Button>
                                        </Box>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Widget>
            </Grid>
            <Grid item xs={12}>
                <Widget title="Giảm giá theo khách hàng">
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Loại khách hàng</TableCell>
                                <TableCell>Tên chương trình</TableCell>
                                <TableCell>% Giảm giá</TableCell>
                                <TableCell>Giá trị tối thiểu</TableCell>
                                <TableCell>Giá trị tối đa</TableCell>
                                <TableCell>Giảm tối thiểu</TableCell>
                                <TableCell>Giảm tối đa</TableCell>
                                <TableCell>Ngày bắt đầu</TableCell>
                                <TableCell>Ngày kết thúc</TableCell>
                                <TableCell>Trạng thái</TableCell>
                                <TableCell>Thao tác</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {discountCustomers.map((d) => (
                                <TableRow key={d.id}>
                                    <TableCell>{d.id}</TableCell>
                                    <TableCell>{d.customerTypeId}</TableCell>
                                    <TableCell>{d.name}</TableCell>
                                    <TableCell>{d.discountValue}</TableCell>
                                    <TableCell>{d.minValueDiscount}</TableCell>
                                    <TableCell>{d.maxValueDiscount ?? "-"}</TableCell>
                                    <TableCell>{d.minDiscount}</TableCell>
                                    <TableCell>{d.maxDiscount}</TableCell>
                                    <TableCell>{d.startDay}</TableCell>
                                    <TableCell>{d.endDay}</TableCell>
                                    <TableCell>{d.status}</TableCell>
                                    <TableCell>
                                        <Box display="flex">
                                            <Button
                                                color="success"
                                                size="small"
                                                variant="contained"
                                                style={{ marginRight: 8 }}
                                                onClick={() => alert(`Sửa ${d.id}`)}
                                            >
                                                Sửa
                                            </Button>
                                            <Button
                                                color="secondary"
                                                size="small"
                                                variant="contained"
                                                onClick={(e) => handleDelete("customer", d.id, e)}
                                            >
                                                Xóa
                                            </Button>
                                        </Box>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Widget>
            </Grid>

            {/* Dialog xác nhận xóa */}
            <Dialog
                open={confirmOpen}
                onClose={() => setConfirmOpen(false)}
            >
                <DialogTitle>Xác nhận xóa</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Bạn có chắc chắn muốn xóa mã giảm giá này không?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setConfirmOpen(false)} color="primary">
                        Hủy
                    </Button>
                    <Button onClick={confirmDelete} color="secondary" variant="contained">
                        Xác nhận
                    </Button>
                </DialogActions>
            </Dialog>
        </Grid>
    );
}