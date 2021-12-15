const { Category } = require("../../models");
const {NotFound} = require("http-errors")

const deleteCategory = async (req, res) => {
    const { _id } = req.user
    const {categoryId} = req.params
    
    const category = await Category.findOneAndDelete({owner: _id, _id: categoryId })

    if (!category) {
        throw new NotFound(`Category with id ${categoryId} not found`)
    }
    
    res.json({
        status: `Category ${categoryId} was deleted`,
        code: 200,
        data: category
    })

}

module.exports = deleteCategory