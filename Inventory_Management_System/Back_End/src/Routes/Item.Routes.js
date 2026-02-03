import { Router } from "express";
import { ItemController } from "../Controller/Item.Controller.js";

const router = new Router();

router.get('/', ItemController.getAll);
//router.get('/search', ItemController.search);
router.get('/:id', ItemController.getById);


export default router;