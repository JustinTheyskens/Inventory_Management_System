import { ItemService } from "../Services/Item.Service";

export const ItemController = {
    getAll: async (req, res) => {
        const items = await ItemService.getAll()
        res.json(items);
    }
}