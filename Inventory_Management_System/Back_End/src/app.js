import express from "express";
import cors from 'cors';
import WarehouseRoutes from "./Routes/Warehouse.Routes.js";
import ItemRoutes from "./Routes/Item.Routes.js";
import InventoryRoutes from "./Routes/Inventory.Routes.js"

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/warehouses", WarehouseRoutes);
app.use("/api/items", ItemRoutes);
app.use("/api/inventory", InventoryRoutes);

export default app;
