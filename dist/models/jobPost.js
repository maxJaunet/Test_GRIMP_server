"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const JobPostSchema = new mongoose_1.default.Schema({
    coverImage: String,
    companyLogo: String,
    companyName: String,
    title: String,
    contractType: String,
    localization: String,
    publishedAt: String
});
const JobPost = mongoose_1.default.model('JobPost', JobPostSchema);
exports.default = JobPost;
