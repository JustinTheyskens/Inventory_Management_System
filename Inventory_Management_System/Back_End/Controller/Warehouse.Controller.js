import { WarehouseService } from "../Services/Warehouse.Service";

export const WarehouseController = {
    getAll: async (req, res) => {
        const warehouses = await WarehouseService.getAll();
        res.json(warehouses);
    },

    getById: async (req, res,) => {
        let id = req.id;
        const warehouse = await WarehouseService.getById(id);
        res.json(warehouse);
    }
}