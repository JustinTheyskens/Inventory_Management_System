import {Router} from "express";
import { WarehouseController } from "../Controller/Warehouse.Controller.js";

const router = Router();

router.get('/', WarehouseController.getAll);
router.get('/search', WarehouseController.search);
router.get('/:id', WarehouseController.getById);


export default router;