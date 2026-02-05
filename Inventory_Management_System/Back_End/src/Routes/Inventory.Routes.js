import { Router } from "express";
import {InventoryController} from "../Controller/Inventory.Controller.js";


const router = new Router();


router.get('/warehouse/:warehouseId', InventoryController.getByWarehouse);
router.get('/warehouse/:warehouseId/search', InventoryController.getByWarehouseSearch);

router.post('/add', InventoryController.add);
router.post('/remove', InventoryController.remove);
router.post('/transfer', InventoryController.transfer);

export default router;