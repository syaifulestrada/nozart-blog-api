import { selectData } from "../models/category.js";

async function getDataCategories() {
    return await selectData();
}

export { getDataCategories };
