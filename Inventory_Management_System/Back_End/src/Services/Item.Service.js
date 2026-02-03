import { ItemRepo } from "../Repos/Item.repo.js";

export const ItemService = {
        getAll: async () => {

            const items = await ItemRepo.findAll();
            return items;
        },
    
        getById: async (id) => {
            return await ItemRepo.findById(id);
        },
}