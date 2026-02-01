import express from "express";
import WarehouseRoutes from "./Routes/Warehouse.Routes.js";

const app = express();

app.use(express.json());
app.use("/api/warehouses", WarehouseRoutes);

export default app;
