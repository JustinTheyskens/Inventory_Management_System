import { WarehouseService } from "../Services/Warehouse.Service.js";

export const WarehouseController = {
    getAll: async (req, res) => {
        const warehouses = await WarehouseService.getAll();
        res.json(warehouses);
    },

    getById: async (req, res) => {
        try
        {
            const {id} = req.params;

            console.log("Searching for warehouse ID:", id);

            const warehouse = await WarehouseService.getById(id);

            if (!warehouse)
            {
                return res.status(404).json({ message: `Warehouse ID not found: ${id}` });
            }

            return res.status(200).json(warehouse);
        }
        catch (error)
        {
            res.status(500).json({message : `Error encountered: ${error.message}`});
        }

    },

    getByLocation: async (req, res) => {
        try
        {
            // const warehouses = await WarehouseService.getAll();
            const {location} = req.query;
            if(!location)
            {
                return res.status(400).json({message : "location required."});
            }
                
            const warehouses = await WarehouseService.getByLocation(location);
            res.json(warehouses);
        }
        catch (error)
        {
            res.status(500).json({message : `Error encountered: ${error.message}`});
        }
        

    }
}