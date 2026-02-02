import { Warehouse } from "../Models/Warehouse.Model.js";

export const WarehouseRepo = {
    findAll: () => Warehouse.find(),
    findById: () => Warehouse.findById(),
    // findByLocation: (location) => Warehouse.find(location)

}