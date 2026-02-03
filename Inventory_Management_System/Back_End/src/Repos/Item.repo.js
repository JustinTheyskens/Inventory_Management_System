import {Item} from '../Models/Item.Model.js';

export const ItemRepo = {
    findAll: () => Item.find(),
    findById: (id) => Item.findById(id),
    findBySku: (sku) => Item.findOne({sku}),
    findByName: (name) => Item.find(name),
    findByCategory: (category) => Item.find(category),
    create: (data) => Item.create(data),
    update: (name, sku, category) => Item.findOneAndUpdate({name, sku, category}),
    delete: (id) => Item.findByIdAndDelete(id)

    // findAllWithWarehouse: () => Item.find().populate('warehouse')
};