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
            console.log('CREATE INVENTORY BODY:', req.body)

            const {item, warehouse, quantity} = req.body;

            // check this bad boy for any missing data
            if (!item || !warehouse || quantity == null) 
            {
                return res.status(400).json({ message: 'Missing required fields' })
            }
            
            const result = await InventoryService.add(item, warehouse, Number(quantity));

            return res.status(201).json(result);
        } 
        catch (error) 
        {
            res.status(400).json({message : `Error encountered: ${error.message}`});
        }
    },

    remove: async (req, res) => {
        console.log('RAW REMOVE BODY:', req.body);
        try
        {
            console.log('RAW REMOVE BODY:', req.body);

            const { itemId, warehouseId, amount } = req.body;

            if (!itemId || !warehouseId || amount == null) 
            {
                throw new Error('Missing required fields');
            }

            const result = await InventoryService.remove(
                itemId,
                warehouseId,
                Number(amount));

            return res.status(200).json(result);
        }
        catch (error)
        {
            console.error('INVENTORY REMOVE ERROR:', error.message);
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
    },
    getByWarehouseSearch: async (req, res) => {
        try
        {
            const {warehouseId} = req.params;
            const {category, name} = req.query;

            const result = await InventoryService.getByWareWithFilters(warehouseId, {category, name});

            return res.json(result);
        }
        catch (error)
        {
            res.status(500).json({message : `Error encountered: ${error.message}`});
        }
    }
}