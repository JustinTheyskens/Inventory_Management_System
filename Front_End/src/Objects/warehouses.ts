import type { Warehouse } from "./warehouse";


export const dummyData : Warehouse[] = [
    {
        _id: "1",
        name: "NY-01",
        location: "New York, NY",
        max_capacity: 500,
        current_capacity: 0
    },

    {
        _id: "2",
        name: "MA-01",
        location: "Boston, MA",
        max_capacity: 1000,
        current_capacity: 0
    },

    {
        _id: "3",
        name: "CA-01",
        location: "San Francisco, CA",
        max_capacity: 1500,
        current_capacity: 0
    }
]