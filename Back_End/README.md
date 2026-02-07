# Warehouse Inventory Management System [WIMS]

A full-stack **Inventory Management System** designed to give administrators complete control over warehouses and inventory across multiple locations. The system emphasizes **clarity, usability, and robust edge-case handling**, ensuring that warehouse capacity constraints and inventory integrity are always enforced.

This project demonstrates modern **MERN stack development**, featuring a scalable backend with **Node.js, Express, and MongoDB**, paired with a responsive and intuitive **React-based UI**.

---

## Project Objective

Develop a comprehensive inventory management solution that enables administrators to:

- Manage multiple warehouses across different locations  
- Track inventory accurately and efficiently  
- Prevent overstocking and capacity violations  
- Quickly view, search, filter, and update inventory data  
- Interact with a clean, intuitive, and responsive UI  

The system prioritizes **data integrity**, **user experience**, and **scalability**, while handling real-world edge cases such as duplicate items and warehouse capacity limits.

## Core Features

### Warehouse Management
- **Create Warehouses**
  - Define name, location, and maximum capacity
- **View Warehouses**
  - Dashboard showing current capacity and utilization
- **Edit Warehouses**
  - Update capacity, name, or location
- **Delete Warehouses**
  - Includes confirmation dialogs to prevent accidental removal

### Inventory Management
- **Add Inventory Items**
  - Specify item name, SKU, category, description, and quantity
- **Edit Inventory Items**
  - Adjust quantities or update item details
- **Delete Inventory Items**
  - Confirmation required before removal
- **View Inventory**
  - Search and filter by name, SKU, or category
- **Transfer Inventory**
  - Move items between warehouses while enforcing capacity constraints

### User Interface & Experience
- **Dashboard Overview**
  - High-level summary of all warehouses and capacity usage
- **Intuitive Navigation**
  - Clear labeling, logical flows, and minimal cognitive overhead
- **Responsive Design**
  - Fully usable on desktop, tablet, and mobile devices
- **Advanced Search & Filtering**
  - Quickly locate warehouses or inventory items
- **Friendly Error Handling**
  - Clear messages for capacity violations and invalid operations

## Edge Case Handling

| Scenario | Behavior |
|--------|---------|
| Warehouse exceeds capacity | Operation is blocked with a clear error message |
| Duplicate inventory item | Existing record is updated instead of creating duplicates |
| Invalid transfers | Prevented if destination capacity is insufficient |
| Destructive actions | Confirmation dialogs required |

## Stretch Goals (Implemented / Planned)

- **Capacity Alerts**
  - Notifications when a warehouse approaches or reaches full capacity
- **Capacity Reports**
  - Historical warehouse utilization trends
- **Item Expiration Tracking**
  - Flag items nearing expiration for review


### Database Design (ERD)

Although implemented in **MongoDB**, the system follows a **relational-style schema design** to maintain data integrity and clarity using references between collections.

```mermaid
erDiagram
    WAREHOUSE ||--o{ INVENTORY : contains
    ITEM ||--o{ INVENTORY : stored_as

    WAREHOUSE {
        ObjectId id PK
        string name
        string location
        int max_capacity
        int current_capacity
    }

    ITEM {
        ObjectId id PK
        string name
        string sku
        string category
        string description
    }

    INVENTORY {
        ObjectId warehouse_id FK
        ObjectId item_id FK
        int quantity
    }
