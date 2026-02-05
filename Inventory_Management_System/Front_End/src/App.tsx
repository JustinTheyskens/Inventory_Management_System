import { useState } from 'react'
import { useEffect } from 'react'
import './App.css'

import { dummyData } from './Objects/warehouses'
import type { Warehouse } from './Objects/warehouse'
import type { Item } from './Objects/Item'
import WarehouseForm from './Components/WarehouseForm'
import EditItemForm from './Components/EditItemForm'
import ItemForm from './Components/ItemForm'

function App() {

  // [const, function ] = useState< 'option' | 'option' >(default) -OR useState(boolean)
  {/* States */}
  // Warehouses
  const [warehouses, setWarehouses] = useState<Warehouse[]>([])
  const [selectedWarehouse, setSelectedWarehouse] = useState<Warehouse | null>(null)
  const [view, setView] = useState<'list' | 'create'>('list') // warehouse list state / create warehouse state.
  const [warehouseSearch, setWarehouseSearch ] = useState('') // warehouse search term.

  // Items
  const [viewingItems, setViewingItems] = useState(false) // viewing item / not viewing items.
  const [editingItem, setEditingItem] = useState<Item | null>(null) // editing item exists / editing item is null.
  const [addingItem, setAddingItem] = useState(false) // adding item state / not addting item state.
  const [itemSearch, setItemSearch] = useState('')
  const [viewingDescription, setViewingDescription] = useState<Item | null>(null)
  const [warehouseItems, setWarehouseItems] = useState<Item[]>([])
  const [itemsLoading, setItemsLoading] = useState(false)
  const [itemsError, setItemsError] = useState<string | null>(null)

  // useEffects
  useEffect(() => {
  fetch('http://localhost:3000/api/warehouses')
    .then(res => res.json())
    .then(data => 
      {
        console.log('WAREHOUSE RESPONSE:', data),
      
        !Array.isArray(data) ?         setWarehouses([]) :

      setWarehouses(data)})
    .catch(err => console.error(err))
    }, [])
    // on mount only

    useEffect(() =>{
      if(!viewingItems) return
      if (!selectedWarehouse?.id) return

      console.log('Loading inventory for:', selectedWarehouse.id)

      loadWarehouseItems(selectedWarehouse.id)
    }, [viewingItems, selectedWarehouse])
    // on viewing item & selected warehouse


  {/* Handlers */}
  const handleDeleteWarehouse = async (id: string) => {
    const confirmed = window.confirm('Are you sure you want to delete this warehouse?')

    if (!confirmed) 
      return

    // console.log('Delete warehouse:', id)
    await fetch(`http://localhost:5000/api/warehouses/${id}`, {method: 'DELETE', })

    setWarehouses(prev => prev.filter(w => w.id !== id))
    setSelectedWarehouse(null)
  }

  const handleAddItem = async (newItem : Item) => {

    if (!selectedWarehouse) 
      return

    const res = await fetch(`http://localhost:5000/api/warehouses/${selectedWarehouse.id}/items`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newItem),
    })

    const createdItem = await res.json();


    // Update state
    setWarehouses( prev => 
      prev.map(warehouse => warehouse.id === selectedWarehouse.id ? 
        { ...warehouse } : warehouse
      )
    )

    // Keep selected warehouse in sync
      // setSelectedWarehouse(prev => prev
      // ? { ...prev, items: [...prev.items, createdItem] }: prev
       setSelectedWarehouse(prev => prev
      ? { ...prev }: prev     
    )
  }

//   const loadWarehouseItems = async (warehouseId: number) => {

//     console.log('Loading items for warehouse:', warehouseId)

//     setItemsLoading(true)

//     const res = await fetch(`http://localhost:3000/api/inventory/warehouse/${warehouseId}/`)

//   const data = await res.json()

//   console.log('ITEM RESPONSE:', data)

//   setWarehouseItems(data)
//   setItemsLoading(false)
// }

const loadWarehouseItems = async (warehouseId: string) => {
  try 
  {
    setItemsLoading(true)

    console.log('Loading items for warehouse:', warehouseId)

    const res = await fetch(`http://localhost:3000/api/inventory/warehouse/${warehouseId}`)

    if (!res.ok) 
    {
      throw new Error(`HTTP ${res.status}`)
    }

    const data = await res.json()

    if (!Array.isArray(data)) 
    {
      console.error('Inventory response not array:', data)
      setWarehouseItems([])
      return
    }

      setWarehouseItems(data)
    } catch (err) {
      console.error('Failed to load inventory:', err)
      setWarehouseItems([])
    } finally {
      setItemsLoading(false)
    }
}



  const handleUpdateItem = async (updatedItem : Item) => {
    if (!selectedWarehouse)
      return

      // fetch from server
      await fetch(`http://localhost:5000/api/warehouses/${selectedWarehouse.id}/items/${updatedItem.id}`,
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedItem),
      })

      // sync warehouses
    setWarehouses(prev =>
    prev.map(warehouse => warehouse.id === selectedWarehouse.id ? {
        ...warehouse, 
      } : warehouse ))

      setSelectedWarehouse(prev => prev ? {
        ...prev, 
      } : prev )
  }
  

  {/* Views */}
  if (view === 'create') {
    return (
      <main className="min-h-screen bg-gray-900 px-6 py-10 text-gray-100">
        <h1 className="mb-6 text-3xl font-bold">Add Warehouse</h1>

      <div className="max-w-md rounded-lg bg-gray-800 p-6">
        <WarehouseForm
          onCancel={() => setView('list')}
          onSave={(warehouse) => {
            console.log('Add warehouse:', warehouse)

            // DOTO:
            // setWarehouses(prev => [prev, warehouse])
            // call backend

            setView('list')
          }}
        />
      </div>
      </main>
    )
  }

  /* reminders for me:
     This is our HTML
     everything returned here is what we see on screen.
  */
  // TODO: I want to make a box for each warehouse *cool* on hover stuff

  return (
    <main className="h-screen w-screen bg-gray-900 px-6 py-10 text-gray-100">
      <h1 className="mb-8 text-center text-3xl font-bold">
        [WIMS]<br></br>
        Warehouse Inventory Management System
      </h1>

      {/* Search Bar */}
      <div className="mb-6 flex justify-center">
        <input
          type="text"
          placeholder="Search warehouses by location or ID..."
          value={warehouseSearch}
          onChange={(e) => setWarehouseSearch(e.target.value)}
          className="w-full max-w-md rounded border border-gray-600 bg-white px-4 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500"
        />
      </div>


      {/* 'Add Warehouse' Button */}
      <div className="mb-6 flex justify-center">
        <button
          onClick={() => setView('create')}
          className="flex h-15 w-48 items-center justify-center cursor-pointer rounded-xl border border-gray-700 bg-gray-800 p-6 shadow-lg transition hover:scale-[1.02] hover:border-blue-500 hover:shadow-blue-500/20"
          aria-label="Add Warehouse">
          Add Warehouse
        </button>
      </div>

      {/* Warehouse Grid */}
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {warehouses.filter((warehouse) => // New Filter Added //
          warehouse.location // Search by location
          .toLowerCase() // my New Filter ends at .map //
          .includes(warehouseSearch.toLowerCase()) || 
          warehouse.name.toString() // Search by ID
          .includes(warehouseSearch)).map((warehouse) => (
            <div
              key={warehouse.name}
              onClick={ () => setSelectedWarehouse(warehouse) }
              className="cursor-pointer rounded-xl border border-gray-700 bg-gray-800 p-6 shadow-lg transition hover:scale-[1.02] hover:border-blue-500 hover:shadow-blue-500/20">
              {/* Header */}
              <h2 className="mb-4 text-xl font-semibold text-blue-400">
                Warehouse {warehouse.name}
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
                  {warehouse.currentItems}
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
          onClick={ () => setSelectedWarehouse(null) }
          >
          <div
            className="w-full max-w-lg rounded-xl bg-gray-800 p-8 shadow-2xl"
            onClick={ (e) => e.stopPropagation() }>
            <h2 className="mb-4 text-2xl font-bold text-blue-400">
              Warehouse {selectedWarehouse.name}
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
                {selectedWarehouse.currentItems}
              </p>
            </div>

            {/* Items View Overlay */}
            {viewingItems && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
                  onClick={() => setSelectedWarehouse(null)} // this is the dakr background?
                  >
                <div className="w-full max-w-lg rounded-xl bg-gray-800 p-8 shadow-2xl"
                  onClick={(e) => e.stopPropagation()}>
                  <h2 className="mb-4 text-xl font-bold text-blue-400">
                    Items — Warehouse #{selectedWarehouse.id}
                  </h2>

                  {/* Item Search Bar */}
                  <input
                    type="text"
                    placeholder="Search items..."
                    value={itemSearch}
                    onChange={(e) => setItemSearch(e.target.value)}
                    className="mb-4 w-full rounded border border-gray-600 bg-white px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500"
                  />


                  
                  {/* Item List Header */}
                  <div className="mb-2 grid grid-cols-4 gap-4 text-xs font-semibold uppercase text-gray-500">
                    <div>Name</div>
                    <div>SKU</div>
                    <div>Category</div>
                    <div className="text-right">Actions</div>
                  </div>

                  {/* Item List */}
                  <div className="h-64 overflow-y-auto rounded bg-white p-4 text-gray-900">
                  {itemsLoading ? (
                    <p className="text-sm text-gray-500">Loading items…</p>
                  ) : itemsError ? (
                    <p className="text-sm text-red-500">{itemsError}</p>
                  ) : warehouseItems.length === 0 ? (
                    <p className="text-sm text-gray-500">
                      No items in this warehouse.
                    </p>
                  ) : (
                    <ul className="space-y-2">
                      {warehouseItems.map(item => (
                        <li
                          key={`${item.id}-${selectedWarehouse?.id}`}
                          className="flex items-center justify-between rounded border p-2"
                        >
                          <div>
                            <p className="font-medium">{item.name}</p>
                            <p className="text-xs text-gray-500">
                              SKU: {item.sku} • Category: {item.category}
                            </p>
                          </div>

                          <button
                            onClick={() => setEditingItem(item)}
                            className="rounded bg-gray-200 px-2 py-1 text-sm hover:bg-gray-300"
                          >
                            Edit
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>


                  {/* Show Items Overlay */}
                  {addingItem && (
                    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/60"
                      onClick={ () => setAddingItem(false) } >
                      <div
                        className="w-full max-w-md rounded-xl bg-gray-800 p-6 shadow-2xl"
                        onClick={ (e) => e.stopPropagation() } >
                        <h3 className="mb-4 text-lg font-bold text-blue-400">
                          Add Item
                        </h3>

                        <ItemForm
                          onCancel={() => setAddingItem(false)}
                            onSave={async (item) => {
                            await handleAddItem(item)
                            setAddingItem(false)
                          }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Item Description Overlay */}
                  {viewingDescription && (
                    <div
                      className="fixed inset-0 z-[70] flex items-center justify-center bg-black/60"
                      onClick={() => setViewingDescription(null)}>
                      <div
                        className="w-full max-w-md rounded-xl bg-gray-800 p-6 shadow-2xl"
                        onClick={(e) => e.stopPropagation()}>
                        <h3 className="mb-2 text-lg font-bold text-blue-400">
                          {viewingDescription.name}
                        </h3>

                        <p className="mb-4 text-sm text-gray-300">
                          {viewingDescription.description || 'No description provided.'}
                        </p>

                        <div className="flex justify-end">
                          <button
                            onClick={() => setViewingDescription(null)}
                            className="rounded bg-gray-700 px-4 py-2 hover:bg-gray-600">
                            Close
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Item Buttons */}
                  <div className="mt-6 flex justify-between">
                    <button
                      onClick={ () => setAddingItem(true) }
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
              <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/60"
                onClick={ () => setEditingItem(null) }>
                <div className="w-full max-w-md rounded-xl bg-gray-800 p-6 shadow-2xl"
                  onClick={ (e) => e.stopPropagation() }>
                  <h3 className="mb-4 text-lg font-bold text-blue-400">
                    Edit Item
                  </h3>
                  <ItemForm
                    item={editingItem}
                    onCancel={() => setEditingItem(null)}
                    onSave={async (item) => {
                      await handleUpdateItem(item)
                      setEditingItem(null)
                    }}
                  />
                </div>
              </div>
            )}

            {/* Buttons */}
            <div className="mt-6 flex justify-between">

              {/* Left Side: */}
              <button
                onClick={() => { 
                  if (!selectedWarehouse) return

                  setViewingItems(true)
                   //loadWarehouseItems(selectedWarehouse.id)
                  }} className="rounded bg-gray-900 px-4 py-2 hover:bg-gray-600">
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
