import React from 'react';
import {
    Box,
    Typography,
    CircularProgress,
    Card,
    CardContent,
    CardActions,
    Button,
    Grid,
    Divider,
    Avatar
} from '@mui/material';
import { useOrders } from '../../hooks/useOrders';
import axios from 'axios';
import { API_URL } from '../../constants/path';

export default function Orders() {
    const { orders, isLoading, refetch } = useOrders();

    const handleStatusUpdate = async (orderId, newStatus) => {
        try {
            await axios.put(`${API_URL}/export-orders/${orderId}/status`, null, {
                params: { status: newStatus }
            });
            await refetch();
        } catch (err) {
            console.error(err);
        }
    };

    if (isLoading) return <CircularProgress />;

    return (
        <Box p={4}>
            <Typography variant="h4" gutterBottom>
                Quản lý đơn hàng
            </Typography>
            <Grid container spacing={4}>
                {orders.map(order => (
                    <Grid item xs={12} key={order.exportOrderID}>
                        <Card shadow="sm">
                            <CardContent>
                                <Typography variant="h6">Mã đơn hàng: {order.exportOrderID}</Typography>
                                <Typography>Họ tên: {order.fullName}</Typography>
                                <Typography>Email: {order.email}</Typography>
                                <Typography>Số điện thoại: {order.phoneNumber}</Typography>
                                <Typography>Địa chỉ: {order.address}</Typography>
                                <Typography>Tổng tiền: {order.totalPrice.toLocaleString()} ₫</Typography>
                                <Typography>Trạng thái: 
                                    <Box component="span" fontWeight="bold" ml={1}>
                                        {order.status === 'CONFIRMED' ? 'Đã xác nhận' : 
                                         order.status === 'CANCELLED' ? 'Đã hủy' : 'Đang chờ'}
                                    </Box>
                                </Typography>

                                <Box mt={2}>
                                    <Typography variant="subtitle1" gutterBottom>Sản phẩm trong đơn:</Typography>
                                    <Grid container spacing={2}>
                                        {order.orderDetails.map(item => (
                                            <Grid item xs={12} md={4} key={item.exportOrderDetailID}>
                                                <Box display="flex" alignItems="center" gap={2}>
                                                    <Avatar variant="rounded" src={item.imageUrl} sx={{ width: 64, height: 64 }} />
                                                    <Box>
                                                        <Typography variant="body2" weight="medium">{item.productName}</Typography>
                                                        <Typography variant="body2" color="text.secondary">
                                                            {item.totalItems} x {item.exportPrice.toLocaleString()} ₫
                                                        </Typography>
                                                        <Typography variant="body2" fontWeight="bold">
                                                            = {item.priceUnit.toLocaleString()} ₫
                                                        </Typography>
                                                    </Box>
                                                </Box>
                                            </Grid>
                                        ))}
                                    </Grid>
                                </Box>
                            </CardContent>

                            <Divider />
                            <CardActions>
                                <Button
                                    variant={order.status === 'CONFIRMED' ? 'contained' : 'outlined'}
                                    color="success"
                                    disabled={order.status === 'CANCELLED'}
                                    onClick={() => handleStatusUpdate(order.exportOrderID, 'CONFIRMED')}
                                >
                                    {order.status === 'CONFIRMED' ? 'ĐÃ XÁC NHẬN' : 'XÁC NHẬN'}
                                </Button>

                                <Button
                                    variant={order.status === 'CANCELLED' ? 'contained' : 'outlined'}
                                    color="error"
                                    disabled={order.status === 'CONFIRMED'}
                                    onClick={() => handleStatusUpdate(order.exportOrderID, 'CANCELLED')}
                                >
                                    {order.status === 'CANCELLED' ? 'ĐÃ HỦY' : 'HỦY ĐƠN'}
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}