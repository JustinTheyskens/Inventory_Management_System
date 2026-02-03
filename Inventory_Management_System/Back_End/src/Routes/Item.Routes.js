import { Router } from "express";
import { ItemController } from "../Controller/Item.Controller.js";

const router = new Router();

router.get('/', ItemController.getAll);
router.get('/:id', ItemController.getById);
router.get('/sku/:sku', ItemController.getBySku);

router.post('/', ItemController.create);

router.delete("/:id", ItemController.delete);


export default router;