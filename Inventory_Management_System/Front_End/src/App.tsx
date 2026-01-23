import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import { dummyData } from './Objects/warehouses'
import type { Warehouse } from './Objects/warehouse'
import type { Item } from './Objects/Item'

import EditItemForm from './Components/EditItemForm'

function App() {
  {/* States */}
  const [selectedWarehouse, setSelectedWarehouse] =
    useState<Warehouse | null>(null)

  const [view, setView] = useState<'list' | 'create'>('list')
  const [viewingItems, setViewingItems] = useState(false)
  const [editingItem, setEditingItem] = useState<Item | null>(null)

  {/* Handlers */}
  const handleDeleteWarehouse = (id: number) => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this warehouse?'
    )

    if (!confirmed) return

    console.log('Delete warehouse:', id)
    setSelectedWarehouse(null)
  }

  const addItem = (name: string) => {
    window.confirm('new item goes here')
    console.log('item created:', name)
  }

  const editItems = (items: Item[]) => {
    items.forEach((element) => {
      console.log(element.name)
    })
  }

  const editItem = (id: number) => {
    const item = selectedWarehouse?.items[id]
    const name = item?.name

    console.log(name)
    console.log(`item properties: ${item}`)
  }

  {/* Views */}
  if (view === 'create') {
    return (
      <main className="min-h-screen bg-gray-900 px-6 py-10 text-gray-100">
        <h1 className="mb-6 text-3xl font-bold">Create Warehouse</h1>

        <div className="max-w-md space-y-4 rounded-lg bg-gray-800 p-6">
          <p className="text-gray-400">
            Warehouse creation form will go here.
          </p>

          <button
            onClick={ () => setView('list') }
            className="rounded bg-gray-700 px-4 py-2 hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      </main>
    )
  }

  /* reminders for me:
     This is our HTML
     everything returned here is what we see on screen.
  */
  // TODO: I want to make a box for each warehouse

  return (
    <main className="min-h-screen w-screen bg-gray-900 px-6 py-10 text-gray-100">
      <h1 className="mb-8 text-center text-3xl font-bold">
        WaIMS - Warehouse and Inventory Management System
      </h1>

      {/* 'Add Warehouse' Button */}
      <div className="mb-6 flex justify-end">
        <button
          onClick={() => setView('create')}
          className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-800 font-bold text-white shadow transition hover:bg-blue-500"
          aria-label="Add Warehouse">
          +
        </button>
      </div>

      {/* Warehouse Grid */}
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {dummyData.map((warehouse) => (
            <div
              key={warehouse.id}
              onClick={ () => setSelectedWarehouse(warehouse) }
              className="cursor-pointer rounded-xl border border-gray-700 bg-gray-800 p-6 shadow-lg transition hover:scale-[1.02] hover:border-blue-500 hover:shadow-blue-500/20">
              {/* Header */}
              <h2 className="mb-4 text-xl font-semibold text-blue-400">
                Warehouse #{warehouse.id}
              </h2>

              {/* Details */}
              <div className="space-y-2 text-sm">
                <p>
                  <span className="font-medium text-gray-400">Location:</span>{' '}
                  {warehouse.location}
                </p>

                <p>
                  <span className="font-medium text-gray-400">Capacity:</span>{' '}
                  {warehouse.maxItems}
                </p>

                <p>
                  <span className="font-medium text-gray-400">
                    Current Inventory:
                  </span>{' '}
                  {warehouse.items.length}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Selected Warehouse Overlay */}
      {selectedWarehouse && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
          onClick={ () => setSelectedWarehouse(null) }>
          <div
            className="w-full max-w-lg rounded-xl bg-gray-800 p-8 shadow-2xl"
            onClick={ (e) => e.stopPropagation() }>
            <h2 className="mb-4 text-2xl font-bold text-blue-400">
              Warehouse #{selectedWarehouse.id}
            </h2>

            {/* Warehouse Properties */}
            <div className="space-y-3 text-sm">
              <p>
                <span className="font-medium text-gray-400">Location:</span>{' '}
                {selectedWarehouse.location}
              </p>

              <p>
                <span className="font-medium text-gray-400">Capacity:</span>{' '}
                {selectedWarehouse.maxItems}
              </p>

              <p>
                <span className="font-medium text-gray-400">
                  Current Inventory:
                </span>{' '}
                {selectedWarehouse.items.length}
              </p>
            </div>

            {/* Items View Overlay */}
            {viewingItems && (
              <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60"
                onClick={ () => setViewingItems(false) }>
                <div
                  className="w-full max-w-xl rounded-xl bg-gray-800 p-6 shadow-2xl"
                  onClick={ (e) => e.stopPropagation() }>
                  <h2 className="mb-4 text-xl font-bold text-blue-400">
                    Items — Warehouse #{selectedWarehouse.id}
                  </h2>

                  {/* Item List */}
                  <div className="h-64 overflow-y-auto rounded bg-white p-4 text-gray-900">
                    {selectedWarehouse.items.length === 0 ? (
                      <p className="text-sm text-gray-500">
                        No items in this warehouse.
                      </p>
                    ) : (
                      <ul className="space-y-2">
                        {selectedWarehouse.items.map((item) => (
                          <li
                            key={item.id}
                            className="flex items-center justify-between rounded border p-2">
                            <span>{item.name}</span>

                            <button
                              onClick={ () => setEditingItem(item) }
                              className="rounded bg-gray-200 px-2 py-1 text-sm hover:bg-gray-300">
                              Edit
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  {/* Item Buttons */}
                  <div className="mt-6 flex justify-between">
                    <button
                      onClick={ () => addItem('New Item') }
                      className="rounded bg-gray-900 px-4 py-2 text-white hover:bg-gray-800">
                      Add Item
                    </button>

                    <button
                      onClick={ () => setViewingItems(false) }
                      className="rounded bg-gray-700 px-4 py-2 hover:bg-gray-600">
                      Back
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Edit Item Overlay Page */}
            {editingItem && (
              <div
                className="fixed inset-0 z-[70] flex items-center justify-center bg-black/60"
                onClick={ () => setEditingItem(null) }>
                <div
                  className="w-full max-w-md rounded-xl bg-gray-800 p-6 shadow-2xl"
                  onClick={ (e) => e.stopPropagation() }>
                  <h3 className="mb-4 text-lg font-bold text-blue-400">
                    Edit Item
                  </h3>

                  <EditItemForm
                    item={editingItem}
                    onCancel={ () => setEditingItem(null) }
                    onSave={ (updatedItem) => { console.log('Save item:', updatedItem)

                      // TODO:
                      // update item in warehouse state
                      // then call backend API

                      setEditingItem(null)
                    } }
                  />
                </div>
              </div>
            )}

            {/* Buttons */}
            <div className="mt-6 flex justify-between">

              {/* Left Side: */}
              <button onClick={ () => setViewingItems(true) }
                className="rounded bg-gray-900 px-4 py-2 hover:bg-gray-600">
                View / Edit Items
              </button>

              {/* Right */}
              <div className="flex gap-3">
                <button onClick={ () => setSelectedWarehouse(null) }
                  className="rounded bg-gray-700 px-4 py-2 hover:bg-gray-600">
                  Close
                </button>

                <button onClick={ () => handleDeleteWarehouse(selectedWarehouse.id) }
                  className="rounded bg-red-600 px-4 py-2 font-semibold text-white hover:bg-red-500">
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}

export default App
