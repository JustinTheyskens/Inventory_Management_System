import InventoryService from "../Services/Inventory.Service.js";

export const InventoryController = {
    getByWarehouse: async (req, res) => {
        try
        {

            const {warehouseId} = req.params;

            const inventory = await InventoryService.getByWarehouse(warehouseId);

            return res.status(200).json(inventory);
        }
        catch (error)
        {
            res.status(500).json({message : `Error encountered: ${error.message}`});
        }
    },

    add: async (req, res) => {
        try
        {
            const {itemId, warehouseId, amount} = req.body;

            const result = await InventoryService.add(itemId, warehouseId, Number(amount));

            return res.status(201).json(result);
        } 
        catch (error) 
        {
            res.status(400).json({message : `Error encountered: ${error.message}`});
        }
    },

    remove: async (req, res) => {
        try
        {
            const {itemId, warehouseId, amount} = req.body;

            const result = await InventoryService.remove(itemId, warehouseId, Number(amount));

            // status here, or no?
            return res.status(200).json(result);
        }
        catch (error)
        {
            res.status(400).json({message : `Error encountered: ${error.message}`});
        }
    },

    transfer: async (req, res) => {
        try
        {
            const {itemId, fromWarehouseId, toWarehouseId, amount} = req.body;
            const result = await InventoryService.transfer(itemId, fromWarehouseId, toWarehouseId, Number(amount));

            // status?
            return res.json(result);
        }
        catch (error)
        {
            res.status(400).json({message : `Error encountered: ${error.message}`});
        }
    }
}