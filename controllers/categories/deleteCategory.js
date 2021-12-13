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
        status: 'sucsess',
        code: 201,
        message: `Category ${categoryId} was deleted`,
        data: {category}
    })

}

module.exports = deleteCategory