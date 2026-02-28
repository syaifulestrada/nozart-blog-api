import {
    selectData,
    insertData,
    updateData,
    deleteData,
    detailData,
} from "../models/post.js";

async function getDataPosts() {
    return await selectData();
}

async function getDetailData(postId) {
    return await detailData(postId);
}

async function insertDataPosts(title, content, categoryIds) {
    if (!title || !content || !categoryIds) {
        throw Object.assign(
            new Error("title, content dan categoryIds wajib diisi."),
            {
                status: 400,
            },
        );
    }
    const ids = Array.isArray(categoryIds) ? categoryIds : [categoryIds];
    return await insertData(title, content, ids);
}

async function updateDataPosts(title, content, id) {
    if (!title && !content) {
        throw Object.assign(new Error("setidaknya salah satu field diisi."), {
            status: 400,
        });
    }
    return await updateData(title, content, id);
}

async function deleteDataPosts(id) {
    return await deleteData(id);
}

export {
    getDataPosts,
    insertDataPosts,
    updateDataPosts,
    deleteDataPosts,
    getDetailData,
};
