import { ItemRepo } from "../Repos/Item.repo.js";

export const ItemService = {
        getAll: async () => {

            const items = await ItemRepo.findAll();
            return items;
        },
    
        getById: async (id) => {
            return await ItemRepo.findById(id);
        },

        getBySku: async (sku) => {
            return await ItemRepo.findBySku(sku);
        },

        delete: async (id) => {
        const hasInvetory = InventoryRepo.hasInventoryForItem(id);

        if (hasInvetory)
        {
            throw new Error("Cannot delete an item with an existing inventory.");
        }

        return await ItemRepo.delete(id);
    }
}