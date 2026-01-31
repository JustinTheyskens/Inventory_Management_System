import { WarehouseRepo } from "../Repos/Warehouse.Repo";

export const WarehouseService = {
    getAll: async () => {

        const warehouses = await WarehouseRepo.findAll();
        const avgInventory = findAverageInventory(warhouses);

        return { // list of warhouses & thier avg inventory count.
            warehouses,
            avgInventory
        }
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