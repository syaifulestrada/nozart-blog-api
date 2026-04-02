import {
    selectData,
    detailData,
    insertData,
    updateData,
    deleteData,
} from "../models/post.model.js";

class PostService {
    static async index({ title }) {
        return selectData({ title });
    }

    static async show(postId) {
        return detailData(postId);
    }

    static async store({ title, content, cover, categoryIds }) {
        if (
            title === undefined ||
            content === undefined ||
            categoryIds === undefined
        ) {
            throw Object.assign(
                new Error("title, content dan categoryIds wajib diisi."),
                {
                    status: 400,
                },
            );
        }
        return insertData(title, content, cover, categoryIds);
    }

    static async update({ title, content, cover, postId, categoryIds }) {
        if (
            title === undefined &&
            content === undefined &&
            categoryIds === undefined
        ) {
            throw Object.assign(
                new Error("setidaknya salah satu field diisi."),
                {
                    status: 400,
                },
            );
        }
        return updateData(title, content, cover, postId, categoryIds);
    }

    static async destroy(postId) {
        return deleteData(postId);
    }
}

export default PostService;
