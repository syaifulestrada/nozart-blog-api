import { selectData } from "../models/post.js";

async function getDataPosts() {
    return await selectData();
}

export { getDataPosts };
