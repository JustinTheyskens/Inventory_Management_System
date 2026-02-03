import InventoryService from "../Services/Inventory.Service.js";

const InventoryController = {
    getByWarehouse: async (req, res) => {
        try{

            const {warehouseId} = req.params;

            const inventory = await InventoryService.getByWarehouse(warehouseId);

            return res.status(200).json(inventory);
        }
        catch (error)
        {
            res.status(500).json({message : `Error encountered: ${error.message}`});
        }
    }
}

export default InventoryController;