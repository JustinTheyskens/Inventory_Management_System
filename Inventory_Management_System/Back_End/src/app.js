import express from "express";
import cors from 'cors';
import WarehouseRoutes from "./Routes/Warehouse.Routes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/warehouses", WarehouseRoutes);

export default app;
