import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../constants/path';

export function useOrders() {
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchOrders = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get(`${API_URL}/export-orders`);
            const ordersData = response.data || [];
            // Sort by createdAt descending (newest first) as fallback
            const sortedOrders = [...ordersData].sort((a, b) => {
                const dateA = new Date(a.createdAt || 0);
                const dateB = new Date(b.createdAt || 0);
                return dateB - dateA; // Descending order (newest first)
            });
            setOrders(sortedOrders);
        } catch (err) {
            console.error('Failed to fetch orders', err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    return { orders, isLoading, refetch: fetchOrders };
}