import PostService from "../services/post.service.js";

function index({ query }) {
    return PostService.index({ query });
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
