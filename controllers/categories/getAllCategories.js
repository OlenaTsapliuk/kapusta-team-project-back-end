const { Category } = require("../../models");

const getAllCategories = async (req, res) => {
    const { _id } = req.user
    
    const userCategories = await Category.find({ owner: _id })
    const basicCategories = await Category.find({ basicCategory: true })
    
    res.json({
        status: 'sucsess',
        code: 201,
        data: [ ...basicCategories, ...userCategories  ]
    })

}

module.exports = getAllCategories