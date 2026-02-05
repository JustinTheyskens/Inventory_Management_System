import { useState } from 'react'
import { useEffect } from 'react'
import './App.css'

import type { Warehouse } from './Objects/warehouse'
import type { Item } from './Objects/Item'
import WarehouseForm from './Components/WarehouseForm'
import ItemForm from './Components/ItemForm'
import type { ItemFormData } from './Objects/ItemFormData'
import TransferForm from './Components/TransferForm'
import type {InventoryRow} from './Objects/InventoryRow'


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
  const [warehouseItems, setWarehouseItems] = useState<InventoryRow[]>([])
  // const [warehouseItems, setWarehouseItems] = useState<Item[]>([])
  const [itemsLoading, setItemsLoading] = useState(false)
  const [itemsError, setItemsError] = useState<string | null>(null)
  const [transferringItem, setTransferringItem] = useState<Item | null>(null)
  const [deletingItem, setDeletingItem] = useState<Item | null>(null)

// for for normalizing all back end data
type AnyObj = Record<string, any>

const normalizeWarehouse = (w: AnyObj): Warehouse => ({
  // fields
  name: String(w.name ?? ''),
  location: String(w.location ?? ''),

  // normalized fields--
  _id: String(w._id ?? w._id),
  max_capacity: Number(w.max_capacity ?? w.max_capacity ?? 0),
  current_capacity: Number(w.currentItems ?? w.current_capacity ?? 0),
})

const normalizeInventoryToItems = (data: any[]): Item[] => {
  //   REMINDER: this does two things:
  // - flattened items: [{id,name,sku,...,quantity}]
  // - inventory rows: [{item:{_id,name,sku,...}, quantity}]
  return data.map((row: any) => {
    const itemDoc = row.item ?? row // if row.item exists, use it, otherwise assume this ROW IS the item!!
    return {
      ...itemDoc,
      id: itemDoc.id ?? itemDoc._id,        
      quantity: row.quantity ?? itemDoc.quantity ?? 0, // take quantity from inventory
    }
  })
}

  

  // useEffects
  useEffect(() => {
    fetch('http://localhost:3000/api/warehouses')
      .then((res) => res.json())
      .then((data) => {
        console.log('WAREHOUSE RESPONSE:', data)

        if (!Array.isArray(data)) {
          console.error('Expected warehouse array:', data)
          setWarehouses([])
          return
        }

        setWarehouses(data.map(normalizeWarehouse))
      })
    .catch((error) => console.error('Failed to load warehouses:', error))
  }, [])

    // on mount only

    useEffect(() =>{
      if(!viewingItems) return
      if (!selectedWarehouse?._id) return

      console.log('Loading inventory for:', selectedWarehouse._id)

      loadWarehouseItems(selectedWarehouse._id)
    }, [viewingItems, selectedWarehouse])
    // on viewing item & selected warehouse


  {/* Handlers */}
  const handleDeleteItem = async (item: Item) => {
    if (!selectedWarehouse) return

    const confirmed = window.confirm(`Remove ${item.name} from this warehouse?`)

    if (!confirmed) return

    try {
      const payload = {
        itemId: item._id,
        warehouseId: selectedWarehouse._id,
        amount: item.quantity,
      }

      console.log('DELETE INVENTORY PAYLOAD:', payload)

      const res = await fetch('http://localhost:3000/api/inventory/remove',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        }
      )

      if (!res.ok) {
        throw new Error('Failed to remove item')
      }

      setWarehouseItems(prev =>
        prev.filter(i => i._id !== item._id)
      )
    } 
    catch (error) 
    {
      console.error(error)
      alert('Failed to remove item from warehouse')
    }
  }


  const handleDeleteWarehouse = async (_id: string) => {
    const confirmed = window.confirm('Are you sure you want to delete this warehouse?')

    if (!confirmed) 
      return

    // console.log('Delete warehouse:', id)
    await fetch(`http://localhost:3000/api/warehouses/${_id}`, {method: 'DELETE', })

    setWarehouses(prev => prev.filter(w => w._id !== _id))
    setSelectedWarehouse(null)
    setViewingItems(false)
  }

  const handleAddWarehouse = async (warehouseData: {name: string, location: string, max_capacity: number}) =>
  {
    try
    {
      const res = await fetch('http://localhost:3000/api/warehouses', {
        method: 'POST',
        headers: {'Content-Type': 'application/json' },
        body: JSON.stringify(warehouseData)
      })

      if (!res.ok)
      {
        //throw new Error('Failed to create Warehouse.')

        // get error data
        const errorData = await res.json()

        // duplicate name? tell user
        if (res.status === 409 || errorData?.message?.includes('duplicate')) 
        {
          alert('Warehouse name already exists. Choose a different name.')
          return
        }

        // generic failure
        alert('Failed to create warehouse. Check input fields again.')
        return
      }

      const createdWarehouse = await res.json();

      // add to list
      setWarehouses(prev => [...prev, createdWarehouse])

      setView('list')
    }
    catch (error)
    {
      console.error('Add item failed:', error)
    }
  }



  const handleAddItem = async (itemData: ItemFormData) => {
      
    if (!selectedWarehouse) 
      return

    try 
    {
      // create a back end item
      const itemRes = await fetch('http://localhost:3000/api/items', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
        name: itemData.name,
        sku: itemData.sku,
        category: itemData.category,
        description: itemData.description,
        })
      })

      if (!itemRes.ok) 
      {
        //throw new Error('Failed to create item.')

        const errorData = await itemRes.json()
        

        // duplicate SKU? tell user
        if (itemRes.status === 409 || errorData?.message?.includes('duplicate')) 
        {
          alert('Item with that SKU already exists. Use a different SKU.')
          return
        }

        // generic error
        alert('Failed to create item. Check your input.')
        return
      }

      // create a back end inventory
      const createdItem = await itemRes.json()

      // is this the correct info?
      console.log('INVENTORY PAYLOAD:', {
        item: createdItem._id,
        warehouse: selectedWarehouse._id,
        quantity: itemData.quantity,
      })

      const inventoryRes = await fetch(
        'http://localhost:3000/api/inventory/add',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            item: createdItem._id,
            warehouse: selectedWarehouse._id,
            quantity: itemData.quantity,
          }),
        }
      )

      if (!inventoryRes.ok) 
      {
        //throw new Error('Failed to create inventory')

          const errorData = await inventoryRes.json()

        if (inventoryRes.status === 409 &&
          errorData?.message?.toLowerCase().includes('capacity')) 
        {
          alert('Warehouse is at maximum capacity. Cannot add more items.')
          return
        }

        alert('Failed to add item to warehouse.')
        return
      }

      await loadWarehouseItems(selectedWarehouse._id)

    } 
    catch (error) 
    {
      console.error('Add item failed:', error)
    }
  }

  const loadWarehouseItems = async (warehouseId: string) => {
    try {
      setItemsLoading(true)
      setItemsError(null)

      console.log('Loading inventory for warehouseId:', warehouseId)

      const res = await fetch(`http://localhost:3000/api/inventory/warehouse/${warehouseId}`)

      if (!res.ok) throw new Error(`HTTP ${res.status}`)

      const data = await res.json()
      console.log('INVENTORY RESPONSE:', data)

      if (!Array.isArray(data)) {
        throw new Error('Inventory response is not an array')
      }
      
      //const items = normalizeInventoryToItems(data)
      setWarehouseItems(data)

    } catch (err: any) {
      console.error('Failed to load inventory:', err)
      setWarehouseItems([])
      setItemsError(err?.message ?? 'Failed to load inventory')
    } finally {
      setItemsLoading(false)
    }
  }


  const handleUpdateItem = async (
    itemId : string,
    data: Omit<ItemFormData, 'quantity'>
    ) => {
    if (!selectedWarehouse)
      return

      // fetch from server
      await fetch(`http://localhost:5000/api/warehouses/${selectedWarehouse._id}/items/${itemId}`,
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.name,
          sku: data.sku,
          category: data.category,
          description: data.description,
        }),
      })

      // sync warehouses
      setWarehouses(prev =>
      prev.map(warehouse => warehouse._id === selectedWarehouse._id ? {
        ...warehouse, 
      } : warehouse ))

      setSelectedWarehouse(prev => prev ? {
        ...prev, 
      } : prev )
  }

  const handleTransferItem = async ({itemId, fromWarehouseId, toWarehouseId, amount} : 
    {itemId: string, fromWarehouseId: string, toWarehouseId: string, amount: number}) => {
      try
      {
        const res = await fetch('http://localhost:3000/api/inventory/transfer', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            itemId,
            fromWarehouseId,
            toWarehouseId,
            amount,
          }),
        })

        if (!res.ok) 
        {
          //throw new Error('Transfer failed')

          // handle item transfer to over capacity warehouse
          const errorData = await res.json()

          if (res.status === 409 && errorData?.message?.toLowerCase().includes('capacity')) 
          {
            alert('Destination warehouse is at maximum capacity.')
            return
          }

          alert('Failed to transfer item.')
          return
        }

        // update warehouse
        await loadWarehouseItems(fromWarehouseId)

        setTransferringItem(null)
      }
      catch (error)
      {
        console.error(error)
        alert('Failed to transfer item')
      }
    } 

  {/* Views */}
  if (view === 'create') {
    return (
      <main className="min-h-screen bg-gray-900 px-6 py-10 text-gray-100">
        <h1 className="mb-6 text-3xl font-bold">Add Warehouse</h1>

      <div className="max-w-md rounded-lg bg-gray-800 p-6">
        <WarehouseForm
          onCancel={() => setView('list')}
          onSave={handleAddWarehouse}
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
              onClick={ () => 
                {
                  setSelectedWarehouse(warehouse)
                  setViewingItems(false)
                  setAddingItem(false)
                  setViewingDescription(null)
                  setEditingItem(null)
                  loadWarehouseItems(warehouse._id)
                } 
              }
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
                  {warehouse.max_capacity}
                </p>

                {/* TODO: add this back in later - 
                  <p> 
                  <span className="font-medium text-gray-400">
                    Current Inventory:
                  </span>{' '}
                  {warehouse.currentItems}
                </p> */}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Selected Warehouse Overlay */}
      {selectedWarehouse && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
          onClick={ () => setViewingItems(false) }
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
                {selectedWarehouse.max_capacity}
              </p>

              <p>
                <span className="font-medium text-gray-400">
                  Current Inventory:
                </span>{' '}
                {itemsLoading ? "loading..." : warehouseItems.length}
              </p>
            </div>

            {/* Items View Overlay */}
            {viewingItems && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
                  onClick={() => setViewingItems(false)} // this is the dakr background?
                  >
                <div className="w-full max-w-lg rounded-xl bg-gray-800 p-8 shadow-2xl"
                  onClick={(e) => e.stopPropagation()}>
                  <h2 className="mb-4 text-xl font-bold text-blue-400">
                    Items — Warehouse {selectedWarehouse.name}
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
                  {/*<div className="mb-2 grid grid-cols-4 gap-4 text-xs font-semibold uppercase text-gray-500">
                    <div>Name</div>
                    <div>SKU</div>
                    <div>Category</div>
                    <div className="text-right">Actions</div>
                  </div>*/ }

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
                      {warehouseItems.map(row => (
                        <li
                          key={`${row.item._id}-${selectedWarehouse?._id}`}
                          className="flex items-center justify-between rounded border p-2">

                          <div>
                            <p className="font-medium">{row.item.name}</p>
                            <p className="text-xs text-gray-500">
                              SKU: {row.item.sku} • Category: {row.item.category}
                            </p>
                          </div>

                          <button
                            onClick={() => setViewingDescription(row.item)}
                            className="rounded bg-blue-100 px-2 py-1 text-sm text-blue-700 hover:bg-blue-200">
                            Description
                          </button>

                          <button
                            onClick={() => setEditingItem(row.item)}
                            className="rounded bg-gray-200 px-2 py-1 text-sm hover:bg-gray-300">
                            Edit
                          </button>

                          <button
                          onClick={() => setTransferringItem(row.item)}
                          className="rounded bg-yellow-200 px-2 py-1 text-sm hover:bg-yellow-300">
                          Transfer
                        </button>
                        <button
                          onClick={() => handleDeleteItem(row.item)}
                          className="rounded bg-red-500 px-2 py-1 text-sm hover:bg-red- 700">
                          Delete
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

                    {/* Item Transfer Overlay */}
                    {transferringItem && selectedWarehouse && (
                    <div
                      className="fixed inset-0 z-[70] flex items-center justify-center bg-black/60"
                      onClick={() => setTransferringItem(null)}
                    >
                      <div
                        className="w-full max-w-md rounded-xl bg-gray-800 p-6 shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <h3 className="mb-4 text-lg font-bold text-blue-400">
                          Transfer Item
                        </h3>

                        <TransferForm
                          item={transferringItem}
                          fromWarehouse={selectedWarehouse}
                          warehouses={warehouses}
                          onCancel={() => setTransferringItem(null)}
                          onTransfer={handleTransferItem}
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
                            onClick={() => 
                              {
                                setViewingDescription(null)
                                setEditingItem(null)
                              }
                            }
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
                      onClick={ () => 
                        {
                          setAddingItem(true)
                          setViewingDescription(null)
                          setEditingItem(null)
                        } 
                      }
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
                    onSave={async (data) => {
                      await handleUpdateItem(editingItem._id, {
                        name: data.name,
                        sku: data.sku,
                        category: data.category,
                        description: data.description,
                      })
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
                  setAddingItem(false)
                  setViewingDescription(null)
                  setEditingItem(null)

                  }} className="rounded bg-gray-900 px-4 py-2 hover:bg-gray-600">
                View / Edit Items
              </button>

              {/* Right */}
              <div className="flex gap-3">
                <button onClick={ (e) => 
                {
                  e.stopPropagation()
                  setViewingDescription(null) 
                  setSelectedWarehouse(null)
                }}
                  className="rounded bg-gray-700 px-4 py-2 hover:bg-gray-600">
                  Close
                </button>

                <button onClick={ () => handleDeleteWarehouse(selectedWarehouse._id) }
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
