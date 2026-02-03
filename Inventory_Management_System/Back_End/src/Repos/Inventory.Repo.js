import { Inventory } from "../Models/Inventory.Model.js";

const InventoryRepo = {

    findByWarehouse: (warehouseId) => Inventory.find({warehouse : warehouseId}).populate("item"),

    findByItem: (itemId) => Inventory.find(itemId).populate("warehouse"),

    findOne: (itemId, warehouseId) => Inventory.findOne({item: itemId, warehouse: warehouseId}),

    create: (data) => Inventory.create(data),

    update: (itemId, warehouseId, quantity) => 
        Inventory.findOneAndUpdate(
        {
            item: itemId,
            warehouse: warehouseId,
        },
        {
            quantity
        },
        {
            new: true
        }
    ),

    findWarehouseWithItemFilter: (warehouseId, itemFIlter) => 
        Inventory
        .find(
        {
            warehouse: warehouseId
        })
        .populate(
        {
            path: "item", 
            match: itemFIlter
        }
    ),

    hasInventoryForWarehouse: (warehouseId) => {
        Inventory.exists({warehouseId})
    },

    hasInventoryForItem: (itemId) => {
        Inventory.exists({item: itemId})
    },

};

export default InventoryRepo;