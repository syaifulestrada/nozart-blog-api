import CategoryService from "../services/category.service.js";

function index() {
    return CategoryService.index();
}

function store(name) {
    if (!name) {
        throw Object.assign(new Error("name wajib diisi."), { status: 400 });
    }

    return CategoryService.store(name);
}

function update(categoryId, name) {
    if (!name) {
        throw Object.assign(new Error("name wajib diisi."), { status: 400 });
    }
    return CategoryService.update(categoryId, name);
}

function destroy(categoryId) {
    return CategoryService.destroy(categoryId);
}

export { index, store, update, destroy };
