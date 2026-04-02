import {
    selectData,
    insertData,
    updateData,
    deleteData,
} from "../models/category.model.js";

async function index() {
    return await selectData();
}

async function store(name) {
    if (!name) {
        throw Object.assign(new Error("name wajib diisi."), { status: 400 });
    }

    return await insertData(name);
}

async function update(name, id) {
    if (!name) {
        throw Object.assign(new Error("name wajib diisi."), { status: 400 });
    }
    return await updateData(name, id);
}

async function destroy(id) {
    return await deleteData(id);
}

export { index, store, update, destroy };
