import { Warehouse } from "../Models/Warehouse.Model";

export const WarehouseRepo = {
    findAll: () => Warehouse.find(),
    findById: () => Warehouse.findById()
}