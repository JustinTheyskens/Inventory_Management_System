import { Router } from "express";
import InventoryController from "../Controller/Inventory.Controller.js";


const router = new Router();

router.get('/warehouse/:warehouseId', InventoryController.getByWarehouse);

export default router;