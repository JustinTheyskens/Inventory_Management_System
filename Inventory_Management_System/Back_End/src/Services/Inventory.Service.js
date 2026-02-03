import InventoryRepo from "../Repos/Inventory.Repo.js";

const InventoryService = {
    getByWarehouse: async (warehouseId) => {
        return await getByWarehouse(warehouseId)
    }
};

export default InventoryService;