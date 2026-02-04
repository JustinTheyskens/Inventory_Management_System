import { WarehouseRepo } from "../Repos/Warehouse.Repo.js";
import InventoryRepo from "../Repos/Inventory.Repo.js";

export const WarehouseService = {
    getAll: async () => {

        const warehouses = await WarehouseRepo.findAll();
        const avgInventory = findAverageInventory(warehouses);

        return { // list of warhouses & thier avg inventory count.
            warehouses,
            avgInventory
        }
    },

    getById: async (id) => {
        return await WarehouseRepo.findById(id);
    },

    getByLocation: async (location) => {

        // have to remember that findByLocation(location) expects an object. ( { location }) expects the attr.
        return await WarehouseRepo.findByLocation({ location });
    },

    search: async (filters) => {

        return await WarehouseRepo.search(filters);
        
    },

    create : async (data) => {
        return await WarehouseRepo.create(data);
    },
    update : async (id, data) => {

        // fields that can be updated
        const allowedFields = 
        [
            "name", 
            "location", 
            "max_capacity"
        ]

        // updated fields go here
        const updatedData = {};

        /* 
         * fill updatedData w/ data's values
         * for each field in the allowed fields.
         * REMEMBER to use *OF* and NOT *IN*.
        */
        for(const field of allowedFields)
        {
            if (data[field] !== undefined)
                updatedData[field] = data[field];
        }

        return await WarehouseRepo.update(id, updatedData);
    },

    delete: async (id) => {
        const hasInvetory = InventoryRepo.hasInventoryForWarehouse(id);

        if (hasInvetory)
        {
            throw new Error("Cannot delete a warehouse with an existing inventory.");
        }

        return await WarehouseRepo.delete(id);
    }

}

const findAverageInventory = (warehouses) => {
    if (warehouses.length > 0)
    {
        let invSum = 0;
        for(const warehouse in warehouses)
        {
            invSum += warehouse.current_capacity;
        }


        return invSum / warehouses.length;
    }

    return 0;
}