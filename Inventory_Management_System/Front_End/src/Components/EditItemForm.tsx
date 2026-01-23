import { useState } from 'react'
import type { Item } from '../Objects/Item'

interface EditItemFormProps {
  item: Item
  onSave: (item: Item) => void
  onCancel: () => void
}

export default function EditItemForm({
  item,
  onSave,
  onCancel,
}: EditItemFormProps) {
  const [name, setName] = useState(item.name)
  const [quantity, setQty] = useState<number>(item.quantity ?? 0)
  const [sku, setSku] = useState(item.sku)
  const [desc, setDesc] = useState(item.description)
  const [loc, setLoc] = useState(item.storageLocation)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    onSave({
      ...item,
      name,
      quantity,
      sku,
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
          required/>
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
          required/>
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
          required/>
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
          required/>
      </div>

      {/* Storage Location */}
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-300">
          Storage Location
        </label>
        <input
          type="text"
          value={loc}
          onChange={(e) => setLoc(e.target.value)}
          className="w-full rounded border border-gray-600 bg-white px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required/>
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
      </div>
    </form>
  )
}