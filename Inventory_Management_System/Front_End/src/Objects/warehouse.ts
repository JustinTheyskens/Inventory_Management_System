import type { Item } from "./Item"

export interface Warehouse {
    id: number

    location: string

    maxItems: number
    
    items: Item[]
}

/*
Add New Warehouse:
Admins should be able to create a new warehouse by specifying its name, location, and maximum capacity.
View Warehouse Details:
Provide a dashboard where admins can view all warehouses, their current capacity, and other key metrics.
Edit Warehouse Information:
Allow admins to update warehouse details like capacity, location, or other relevant information.
Delete Warehouse:
Admins should be able to delete a warehouse. Implement confirmation dialogs to prevent accidental deletions.
*/