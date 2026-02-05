import type { Warehouse } from "./warehouse";


export const dummyData : Warehouse[] = [
    {
        _id: "1",
        name: "NY-01",
        location: "New York, NY",
        maxItems: 500,
        currentItems: 0
    },

    {
        _id: "2",
        name: "MA-01",
        location: "Boston, MA",
        maxItems: 1000,
        currentItems: 0
    },

    {
        _id: "3",
        name: "CA-01",
        location: "San Francisco, CA",
        maxItems: 1500,
        currentItems: 0
    }
]