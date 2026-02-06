import { Warehouse } from "../Models/Warehouse.Model.js";
import InventoryRepo from "../Repos/Inventory.Repo.js";

const InventoryService = {
    getByWarehouse: async (warehouseId) => {
        return await InventoryRepo.findByWarehouse(warehouseId);
    },

    add: async (itemId, warehouseId, amount) => {
        if (amount < 0)
        {
            throw new Error("Amount cannot be below 0.");  
        }

        const existingInventory = await InventoryRepo.findOne(itemId, warehouseId);

        if (existingInventory)
        {
            return await InventoryRepo.update(itemId, warehouseId, existingInventory.quantity + amount);
        }

        return await InventoryRepo.create(
            {
                item: itemId,
                warehouse: warehouseId,
                quantity: amount
            });
    },

    remove: async (itemId, warehouseId, amount) => {
            console.log("REMOVE SERVICE VALUES:", { itemId, warehouseId, amount });

        if (!itemId || !warehouseId) 
        {
            throw new Error('Missing itemId or warehouseId');
        }

        if (amount <= 0) {
            throw new Error('Amount must be greater than 0');
        }

        const inventory = await InventoryRepo.findOne({
            item: itemId,
            warehouse: warehouseId
        });

        console.log('FOUND INVENTORY:', inventory);

        if (!inventory) {
            throw new Error('Inventory record not found');
        }

        // Remove all or partial
        const newQuantity = inventory.quantity - amount;

        if (newQuantity <= 0) {
            await InventoryRepo.deleteOne({
            item: itemId,
            warehouse: warehouseId
            });
            return { removed: true };
        }

        inventory.quantity = newQuantity;
        await inventory.save();

        return inventory;
        
    },


    transfer: async (itemId, fromWarehouseId, toWarehouseId, amount) => {
        if (fromWarehouseId == toWarehouseId)
        {
            throw new Error("scource & destination warehouses must be different.");
        }

        const toWarehouse = await Warehouse.findById(toWarehouseId);

        if (!toWarehouse) 
        {
            throw new Error('Destination warehouse not found')
        }

        if (toWarehouse.current_capacity + amount > toWarehouse.max_capacity)
        {
            throw new Error('Warehouse capacity exceeded')
        }

        // remove from source
        await InventoryService.remove(itemId, fromWarehouseId, amount);

        // then add to dest.
        return await InventoryService.add(itemId, toWarehouseId, amount);

    },

    getByWareWithFilters: async (warehouseId, {category, name} ) => {
        const itemFIlter = {};

        if (category)
        {
            itemFIlter.category = category;
        }

        if (name)
        {
            itemFIlter.name = 
            {
                $regex: name,
                $options: "i" // not case sensitive
            };
        }

        const inventory = await InventoryRepo.findWarehouseWithItemFilter(warehouseId, itemFIlter);

        return inventory.filter(row => row.item !== null);
    }
};

export default InventoryService;