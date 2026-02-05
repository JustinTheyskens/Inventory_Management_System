import { useState } from 'react'
import type { Warehouse } from '../Objects/warehouse'

interface WarehouseFormProps {
  onSave: (warehouse: {
    name: string,
    location: string,
    max_capacity: number
    
  }) => void // Omit<Warehouse, '_id'>
  onCancel: () => void
}

export default function WarehouseForm({
  onSave,
  onCancel,
}: WarehouseFormProps) {
  const [location, setLocation] = useState('')
  const [name, setName] = useState('')
  const [maxItems, setMaxItems] = useState<number>(0)
  const [currentItems, setCurrentItems] = useState<number>(0)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    onSave({
      location,
      name,
      max_capacity: maxItems,
      //currentItems,
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
          className="w-full rounded border border-gray-600 bg-white px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      {/* Location */}
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-300">
          Location
        </label>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full rounded border border-gray-600 bg-white px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      {/* Max Items */}
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-300">
          Maximum Capacity
        </label>
        <input
          type="number"
          min={1}
          value={maxItems}
          onChange={(e) => setMaxItems(Number(e.target.value))}
          className="w-full rounded border border-gray-600 bg-white px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500"
          required />
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
          Add Warehouse
        </button>
      </div>
    </form>
  )
}
