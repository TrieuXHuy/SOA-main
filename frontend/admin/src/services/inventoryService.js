import axios from "axios";
import { API_URL } from "../constants/path";

/**
 * Inventory API Service
 * Quản lý tất cả các API calls liên quan đến Inventory
 */

const INVENTORY_ENDPOINT = `${API_URL}/inventories`;

/**
 * Lấy tất cả inventory
 */
export const getAllInventories = async () => {
    try {
        const response = await axios.get(INVENTORY_ENDPOINT);
        return response.data;
    } catch (error) {
        console.error("Error fetching inventories:", error);
        throw error;
    }
};

/**
 * Lấy inventory theo ID
 * @param {string} inventoryID - ID của inventory
 */
export const getInventoryById = async (inventoryID) => {
    try {
        const response = await axios.get(`${INVENTORY_ENDPOINT}/${inventoryID}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching inventory ${inventoryID}:`, error);
        throw error;
    }
};

/**
 * Tạo inventory mới
 * @param {Object} inventoryData - Dữ liệu inventory
 */
export const createInventory = async (inventoryData) => {
    try {
        const response = await axios.post(INVENTORY_ENDPOINT, inventoryData);
        return response.data;
    } catch (error) {
        console.error("Error creating inventory:", error);
        throw error;
    }
};

/**
 * Cập nhật inventory
 * @param {string} inventoryID - ID của inventory
 * @param {Object} inventoryData - Dữ liệu inventory cần cập nhật
 */
export const updateInventory = async (inventoryID, inventoryData) => {
    try {
        const response = await axios.put(
            `${INVENTORY_ENDPOINT}/${inventoryID}`,
            inventoryData
        );
        return response.data;
    } catch (error) {
        console.error(`Error updating inventory ${inventoryID}:`, error);
        throw error;
    }
};

/**
 * Xóa inventory
 * @param {string} inventoryID - ID của inventory
 */
export const deleteInventory = async (inventoryID) => {
    try {
        await axios.delete(`${INVENTORY_ENDPOINT}/${inventoryID}`);
    } catch (error) {
        console.error(`Error deleting inventory ${inventoryID}:`, error);
        throw error;
    }
};

/**
 * Tìm kiếm inventory theo từ khóa
 * @param {string} keyword - Từ khóa tìm kiếm (productID, inventoryID)
 */
export const searchInventories = async (keyword) => {
    try {
        const allInventories = await getAllInventories();
        const lowerKeyword = keyword.toLowerCase();
        return allInventories.filter(
            inv =>
                inv.inventoryID.toLowerCase().includes(lowerKeyword) ||
                inv.productID.toLowerCase().includes(lowerKeyword)
        );
    } catch (error) {
        console.error("Error searching inventories:", error);
        throw error;
    }
};

/**
 * Lấy inventory theo productID
 * @param {string} productID - ID của sản phẩm
 */
export const getInventoriesByProductId = async (productID) => {
    try {
        const allInventories = await getAllInventories();
        return allInventories.filter(inv => inv.productID === productID);
    } catch (error) {
        console.error(`Error fetching inventory for product ${productID}:`, error);
        throw error;
    }
};
