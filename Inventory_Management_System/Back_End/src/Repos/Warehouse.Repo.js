import { Warehouse } from "../Models/Warehouse.Model.js";

export const WarehouseRepo = {
    findAll: () => Warehouse.find(),

    findById: (id) => Warehouse.findById(id),

    /*
    ' = {}' is a default empty object. this prevents destructoring from failing
     and crashing when one of the search params is undefined.
     */
    
    search: ({location, maxCapacity} = {}) => {

        const query = {};

        if (location)
        {
            query.location = RegExp(location.trim(), "i");
        }

        if (maxCapacity !== undefined && maxCapacity !== "")
        {
            query.max_capacity = Number(maxCapacity);
        }

        console.log("Mongo query:", query);
        return Warehouse.find(query);    
    },

    create: (data) => Warehouse.create(data),
  
    update: (location, max_capacity, current_capacity) => 
        Warehouse.findOneAndUpdate({location, max_capacity, current_capacity}),

    delete: (id) => Warehouse.findByIdAndDelete(id),

}