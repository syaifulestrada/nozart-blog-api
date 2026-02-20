import { selectData, insertData } from "../models/post.js";

async function getDataPosts() {
    return await selectData();
}

async function insertDataPosts(title, content) {
    return insertData(title, content);
}

export { getDataPosts, insertDataPosts };
