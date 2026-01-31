import {Item} from '../Models/Item.Model';

export const itemRepo = {
    findAll: () => Item.find(),
    findBySku: (sku) => Item.findOne({sku}),
    findByName: (name) => Item.find(name),
    findByCategory: (category) => Item.find(category)

    // findAllWithWarehouse: () => Item.find().populate('warehouse')
};