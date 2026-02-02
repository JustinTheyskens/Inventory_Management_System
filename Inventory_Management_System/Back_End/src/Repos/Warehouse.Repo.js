import { Warehouse } from "../Models/Warehouse.Model.js";

export const WarehouseRepo = {
    findAll: () => Warehouse.find(),
    findById: (id) => Warehouse.findById(id),
    findByLocation: (location) => Warehouse.find(location)

}