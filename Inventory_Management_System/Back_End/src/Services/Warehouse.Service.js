import { WarehouseRepo } from "../Repos/Warehouse.Repo.js";

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
        return await WarehouseRepo.findByLocation(location);
    }
}

const findWarehouseCount = (warehouses) => {
    return warhouses.length;
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