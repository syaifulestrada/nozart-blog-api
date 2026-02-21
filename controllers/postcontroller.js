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
    if (!title || !content) {
        throw Object.assign(new Error("title dan content wajib diisi."), {
            status: 400,
        });
    }
    return await insertData(title, content);
}

async function updateDataPosts(title, content, id) {
    if (!title && !content) {
        throw Object.assign(new Error("setidaknya salah satu field diisi."), {
            status: 400,
        });
    }
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
