import { ItemService } from "../Services/Item.Service.js";

export const ItemController = {
    getAll: async (req, res) => {
        const items = await ItemService.getAll()
        res.json(items);
    }
}