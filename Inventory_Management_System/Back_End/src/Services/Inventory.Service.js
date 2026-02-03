import InventoryRepo from "../Repos/Inventory.Repo.js";

const InventoryService = {
    getByWarehouse: async (warehouseId) => {
        return await InventoryRepo.findByWarehouse(warehouseId);
    }
};

export default InventoryService;