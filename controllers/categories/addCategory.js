const { Category } = require("../../models");
const {Conflict} = require("http-errors")

const addCategory = async (req, res) => {
    const { _id } = req.user
    const { category } = req.body
    
    const basicCategories = ["Продукты", "Транспорт", "Здоровье", "Алкоголь", "Развлечения", "Всё для дома", "Техника", "Коммуналка, связь", "Спорт, хобби", "Образование", "Прочие"]
    const doseCategoryExists = await Category.findOne({ category, owner: _id })
    
    if (doseCategoryExists || basicCategories.includes(category)) {
        throw new Conflict("Category alrady exists")
    }

    const newCategory = await Category.create({ ...req.body, owner: _id })

    res.status(201).json({
        status: 'sucsess',
        code: 201,
        data: { newCategory }
    })

}

module.exports = addCategory