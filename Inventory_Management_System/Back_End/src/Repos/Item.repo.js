import {Item} from '../Models/Item.Model.js';

export const ItemRepo = {
    findAll: () => Item.find(),
    findBySku: (sku) => Item.findOne({sku}),
    findByName: (name) => Item.find(name),
    findByCategory: (category) => Item.find(category)

    // findAllWithWarehouse: () => Item.find().populate('warehouse')
};