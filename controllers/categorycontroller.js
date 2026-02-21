import { selectData, insertData, updateData } from "../models/category.js";

async function getDataCategories() {
    return await selectData();
}

async function insertDataCategories(name) {
    if (!name) {
        throw Object.assign(new Error("name wajib diisi."), { status: 400 });
    }

    return await insertData(name);
}

async function updateDataCategories(name, id) {
    return await updateData(name, id);
}

export { getDataCategories, insertDataCategories, updateDataCategories };
