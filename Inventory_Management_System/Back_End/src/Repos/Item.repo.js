import {Item} from '../Models/Item.Model.js';

export const ItemRepo = {
    findAll: () => Item.find(),
    findById: (id) => Item.findById(id),
    findBySku: (sku) => Item.findOne({sku}),
    findByName: (name) => Item.find(name),
    findByCategory: (category) => Item.find(category)

    // findAllWithWarehouse: () => Item.find().populate('warehouse')
};