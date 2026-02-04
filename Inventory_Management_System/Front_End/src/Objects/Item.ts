export interface Item {
    id: number
    name: string

    quantity?: number
    sku: string
    category: string
    description?: string
}

/* item details: name, SKU, description, quantity, and storage location... category, maybe?

Add Inventory Items:
Admins should be able to add items to a warehouse

Edit Inventory Items:
update existing item details, such as adjusting quantity or editing descriptions.

Delete Inventory Items:
Implement a feature for admins to remove items from inventory. Like warehouse deletion, this should include a confirmation step.

View Inventory Items:
Admins should be able to view a list of all items within a warehouse, 
search and filter capabilities based on item:
 name, SKU, category, or other attributes.

Transfer Inventory Between Warehouses:
Enable the transfer of items between warehouses.
Source and destination warehouse capacities are considered.
*/