import type { Item } from './Item'

export interface InventoryRow {
  _id: string
  item: Item
  warehouse: string
  quantity: number
}
