import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../constants/path";

export function useInventories() {
    const [inventories, setInventories] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        axios.get(`${API_URL}/inventories`)
            .then(res => setInventories(res.data))
            .catch(console.error)
            .finally(() => setIsLoading(false));
    }, []);

    return { inventories, isLoading, setInventories };
}