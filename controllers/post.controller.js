import PostService from "../services/post.service.js";

function index({ title }) {
    return PostService.index({ title });
}

function show(postId) {
    return PostService.show(postId);
}

function store(payload) {
    return PostService.store(payload);
}

function update(payload) {
    return PostService.update(payload);
}

function destroy(postId) {
    return PostService.destroy(postId);
}

export { index, show, store, update, destroy };
