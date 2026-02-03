import { Router } from "express";
import { ItemController } from "../Controller/Item.Controller.js";

const router = new Router();

router.get('/', ItemController.getAll);
//router.get('/search', ItemController.search);
router.get('/:id', ItemController.getById);
router.get('/sku/:sku', ItemController.getBySku);
//router.get('/category/:category', ItemController.getByCategory);


export default router;