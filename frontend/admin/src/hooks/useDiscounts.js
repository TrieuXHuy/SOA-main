import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../constants/path";

export function useDiscounts() {
    const [discountOrders, setDiscountOrders] = useState([]);
    const [discountCustomers, setDiscountCustomers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        Promise.all([
            axios.get(`${API_URL}/discount-orders`),
            axios.get(`${API_URL}/discount-customers`)
        ])
            .then(([ordersRes, customersRes]) => {
                setDiscountOrders(ordersRes.data);
                setDiscountCustomers(customersRes.data);
            })
            .catch(console.error)
            .finally(() => setIsLoading(false));
    }, []);

    return { discountOrders, discountCustomers, isLoading };
}