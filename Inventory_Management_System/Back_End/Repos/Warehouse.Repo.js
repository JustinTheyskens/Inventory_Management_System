import { Warehouse } from "../Models/Warehouse.Model";

export const warehouseRepo = {
    findAll: () => Warehouse.find(),
    
}