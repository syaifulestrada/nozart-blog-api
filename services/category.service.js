import {
    selectData,
    insertData,
    updateData,
    deleteData,
} from "../models/category.model.js";

class CategoryService {
    static async index() {
        return selectData();
    }

    static async store(name) {
        return await insertData(name);
    }

    static async update(name) {
        return await updateData(name);
    }

    static async destroy(categoryId, name) {
        return await deleteData(categoryId, name);
    }
}

export default CategoryService;
