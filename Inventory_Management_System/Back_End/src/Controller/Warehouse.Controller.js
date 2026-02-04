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

    search: async (req, res) => {
        try
        {
            const {location, maxCapacity} = req.query;

            const warehouses = await WarehouseService.search({location, maxCapacity});

            console.log("Search params:", req.query);

            res.json(warehouses);
        }
        catch (error)
        {
            res.status(500).json({message : `Error encountered: ${error.message}`});
        }
    },
    create: async (req, res) => {
        try 
        {
            const warehouse = await WarehouseService.create(req.body);

            return res.status(201).json(warehouse);
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
            const warehouse = await WarehouseService.update(id, req.body);

            if (!warehouse)
            {
                return res.status(404).json({ message: `Warehouse ID not found: ${id}` });
            }

            return res.json(warehouse);
        }
        catch (error)
        {
            res.status(400).json({message : `Error encountered: ${error.message}`});
        }
    },
    delete: async (req, res) => {
        try
        {
            const {id} = req.params;

            console.log("Deleting warehouse:", id);

            await WarehouseService.delete(id);

            return res.status(204).send();

        }
        catch (error)
        {
            res.status(500).json({message : `Error encountered: ${error.message}`});
        }
    }
}