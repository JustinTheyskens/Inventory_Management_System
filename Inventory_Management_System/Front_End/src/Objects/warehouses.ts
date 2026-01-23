import type { Warehouse } from "./warehouse";


export const dummyData : Warehouse[] = [
    {
        id: 1,
        location: "New York, NY",
        maxItems: 500,
        items: [
            { id: 1, name: 'Hammer', sku: 'ABC123'},
            { id: 2, name: 'Wrench', sku:'ABC456' }
        ]
    },

    {
        id: 2,
        location: "Boston, MA",
        maxItems: 1000,
        items: []
    },

    {
        id: 3,
        location: "San Francisco, CA",
        maxItems: 1500,
        items: []
    }
]