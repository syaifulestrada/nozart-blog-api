import {
    selectData,
    insertData,
    updateData,
    deleteData,
} from "../models/post.js";

async function getDataPosts() {
    return await selectData();
}

async function insertDataPosts(title, content) {
    return await insertData(title, content);
}

async function updateDataPosts(title, content, id) {
    const payload = {
        title,
        content,
    };
    return await updateData(payload, id);
}

async function deleteDataPosts(id) {
    return await deleteData(id);
}

export { getDataPosts, insertDataPosts, updateDataPosts, deleteDataPosts };
