import { ItemService } from "../Services/Item.Service.js";

export const ItemController = {
    getAll: async (req, res) => {
        const items = await ItemService.getAll()
        res.json(items);
    },

    getById: async (req, res) => {
        try
        {
            const {id} = req.params;

            console.log("Searching for item ID:", id);

            const item = await ItemService.getById(id);

            if (!item)
            {
                return res.status(404).json({ message: `item ID not found: ${id}` });
            }

            return res.status(200).json(item);
        }
        catch (error)
        {
            res.status(500).json({message : `Error encountered: ${error.message}`});
        }
    },

    getBySku: async (req, res) => {

        try
        {
            const {sku} = req.params;

            const item = await ItemService.getBySku(sku);

            if (!item) 
            {
                return res.status(404).json({ message: `Item SKU not found: ${sku}` });
            }

            return res.status(200).json(item);
        }
        catch (error)
        {
            res.status(500).json({message : `Error encountered: ${error.message}`});
        }
    },

    create: async (req, res) => {
        try 
        {
            const item = await ItemService.create(req.body);

            return res.status(201).json(item);
        } 
        catch (error) 
        {
            res.status(400).json({message : `Error encountered: ${error.message}`});
        }
    },

    update: async (req, res) => {
        try
        {
            const {id} = req.params;
            const item = await ItemService.update(id, req.body);

            if (!item)
            {
                return res.status(404).json({ message: `Item ID not found: ${id}` });
            }

            return res.json(item);
        }
        catch (error)
        {
            res.status(400).json({message : `Error encountered: ${error.message}`});
        }
    },

    delete: async (req, res) =>
    {
        try
        {
            const {id} = req.params;

            console.log("Deleting item:", id);

            await ItemService.delete(id);

            return res.status(204).send();

        }
        catch (error)
        {
            res.status(500).json({message : `Error encountered: ${error.message}`});
        }     
    }
}