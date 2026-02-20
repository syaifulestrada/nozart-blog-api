import { selectData, insertData, updateData } from "../models/post.js";

async function getDataPosts() {
    return await selectData();
}

async function insertDataPosts(title, content) {
    return insertData(title, content);
}

async function updateDataPosts(title, content, id) {
    const payload = {
        title,
        content,
    };
    return updateData(payload, id);
}

export { getDataPosts, insertDataPosts, updateDataPosts };
