"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePost = exports.updatePost = exports.getSinglePost = exports.getPosts = exports.createPost = void 0;
const jobPost_1 = __importDefault(require("../models/jobPost"));
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const postData = req.body;
    const newPost = new jobPost_1.default(postData);
    try {
        yield newPost.save();
        res.status(201).json(newPost);
    }
    catch (error) {
        res.status(409).json({ message: String(error) });
    }
});
exports.createPost = createPost;
const getPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const allPosts = yield jobPost_1.default.find();
    try {
        res.status(200).json(allPosts);
    }
    catch (error) {
        res.status(404).json({ message: String(error) });
    }
});
exports.getPosts = getPosts;
const getSinglePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { postId } = req.params;
    const foundPost = yield jobPost_1.default.findById(postId);
    try {
        foundPost && res.status(200).json(foundPost);
    }
    catch (error) {
        res.status(404).json({ message: String(error) });
    }
});
exports.getSinglePost = getSinglePost;
const updatePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { params: { postId }, body } = req;
        const updatedUser = yield jobPost_1.default.findOneAndUpdate({ _id: postId }, { $set: body }, { new: true });
        res.status(200).json(updatedUser);
    }
    catch (error) {
        res.status(404).json({ message: String(error) });
    }
});
exports.updatePost = updatePost;
const deletePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { postId } = req.params;
    try {
        const deletedPost = yield jobPost_1.default.deleteOne({ _id: postId });
        res.status(204).json({ message: 'post deleted' });
        console.log("post deleted");
    }
    catch (error) {
        res.status(403).json({ message: String(error) });
    }
});
exports.deletePost = deletePost;
