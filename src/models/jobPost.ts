import mongoose from "mongoose";
import { IJobPost } from '../types/jobPost';

const JobPostSchema = new mongoose.Schema({
  coverImage: String,
  companyLogo: String,
  companyName: String,
  title: String,
  content: String,
  contractType: String,
  localization: String,
  publishedAt: String
});

const JobPost = mongoose.model<IJobPost>('JobPost', JobPostSchema);
export default JobPost;