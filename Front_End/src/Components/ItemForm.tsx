import { useState } from 'react'
import type { Item } from '../Objects/Item'
import type { ItemFormData } from '../Objects/ItemFormData'
import App from '../App'

interface ItemFormProps {
  item?: Item
  onSave: (data: ItemFormData) => void
  onCancel: () => void
  onDelete?: (item: Item) => void
}

export default function ItemForm({
  item,
  onSave,
  onCancel,
  onDelete,
}: ItemFormProps) {
  const [name, setName] = useState(item?.name ?? '')
  const [quantity, setQty] = useState<number>(item?.quantity ?? 0)
  const [sku, setSku] = useState(item?.sku ?? '')
  const [desc, setDesc] = useState(item?.description ?? '')
  const [category, setCategory] = useState(item?.category ?? '')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

  onSave({
    name,
    sku,
    category,
    description: desc,
    quantity
  })

  

  

  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Name */}
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-300">
          Name
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded border border-gray-600 bg-white px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      {/* Quantity */}
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-300">
          Quantity
        </label>
        <input
          type="number"
          min={0}
          value={quantity}
          onChange={(e) => setQty(Number(e.target.value))}
          className="w-full rounded border border-gray-600 bg-white px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      {/* SKU */}
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-300">
          SKU
        </label>
        <input
          type="text"
          value={sku}
          onChange={(e) => setSku(e.target.value)}
          className="w-full rounded border border-gray-600 bg-white px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      {/* Description */}
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-300">
          Description
        </label>
        <input
          type="text"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          className="w-full rounded border border-gray-600 bg-white px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      {/* Category */}
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-300">
          Category
        </label>
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full rounded border border-gray-600 bg-white px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="rounded bg-gray-700 px-4 py-2 hover:bg-gray-600">
          Cancel
        </button>

        <button
          type="submit"
          className="rounded bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-500">
          Save
        </button>

        <button type="button"
        onClick={() => {
          if (!window.confirm(`Delete ${item?.name} from this warehouse?`)) return
          if(item)
          onDelete?.(item)
        } }
        className="rounded bg-red-600 px-4 py-2 font-semibold text-white hover:bg-red-500">
        Delete
        </button>
      </div>
    </form>
  )
}