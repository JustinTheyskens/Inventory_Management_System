import { useState } from 'react'
import type { Item } from '../Objects/Item'
import type { Warehouse } from '../Objects/warehouse'

interface TransferFormProps {
  item: Item
  fromWarehouse: Warehouse
  warehouses: Warehouse[]
  onTransfer: (args: {
    itemId: string
    fromWarehouseId: string
    toWarehouseId: string
    amount: number
  }) => void
  onCancel: () => void
}

export default function TransferForm({
  item,
  fromWarehouse,
  warehouses,
  onTransfer,
  onCancel,
    }: TransferFormProps) {
  const [toWarehouseId, setToWarehouseId] = useState('')
  const [amount, setAmount] = useState(1)

  const availableWarehouses = warehouses.filter(
    (w) => w._id !== fromWarehouse._id
  )

  return (
    <form onSubmit={(e) => {
        e.preventDefault()
        onTransfer({
          itemId: item._id,
          fromWarehouseId: fromWarehouse._id,
          toWarehouseId,
          amount,
        })
      }}
      className="space-y-4"
    >
      <p className="text-sm text-gray-300">
        Item: <strong>{item.name}</strong>
      </p>

      {/* Destination */}
      <div>
        <label className="block text-sm font-medium text-gray-300">
          Destination Warehouse
        </label>
        <select
          value={toWarehouseId}
          onChange={(e) => setToWarehouseId(e.target.value)}
          className="w-full rounded bg-white px-3 py-2 text-gray-900"
          required>
          <option value="">Select warehouse</option>
          {availableWarehouses.map((w) => (
            <option key={w._id} value={w._id}>
              {w.name}
            </option>
          ))}
        </select>
      </div>

      {/* Quantity */}
      <div>
        <label className="block text-sm font-medium text-gray-300">
          Quantity
        </label>
        <input
          type="number"
          min={1}
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          className="w-full rounded bg-white px-3 py-2 text-gray-900"
          required
        />
      </div>

      {/* Buttons */}
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
          Transfer
        </button>
      </div>
    </form>
  )
}