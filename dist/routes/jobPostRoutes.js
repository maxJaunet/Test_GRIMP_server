"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jobPosts_1 = require("../controllers/jobPosts");
const router = express_1.default.Router();
router.get('/jobPost', jobPosts_1.getPosts);
router.get('/jobPost/:postId', jobPosts_1.getSinglePost);
router.post('/jobPost', jobPosts_1.createPost);
router.put('/jobPost/:postId', jobPosts_1.updatePost);
router.patch('/jobPost/:postId', jobPosts_1.updatePost);
router.delete('/jobPost/:postId', jobPosts_1.deletePost);
exports.default = router;
