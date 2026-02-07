import { ItemRepo } from "../Repos/Item.repo.js";
import InventoryRepo from "../Repos/Inventory.Repo.js";

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
        create : async (data) => {
            return await ItemRepo.create(data);
        },
        update : async (id, data) => {
    
            // fields that can be updated
            const allowedFields = 
            [
                "sku",
                "name", 
                "category", 
                "description"
            ]
    
            // updated fields go here
            const updatedData = {};
    
            /* 
                * fill updatedData w/ data's values
                * for each field in the allowed fields.
                * REMEMBER to use *OF* and NOT *IN*.
            */
            for(const field of allowedFields)
            {
                if (data[field] !== undefined)
                    updatedData[field] = data[field];
            }
    
            return await ItemRepo.update(id, updatedData);
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