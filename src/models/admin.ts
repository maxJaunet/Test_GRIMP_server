import mongoose from "mongoose";
import { IAdmin } from '../types/admin';

const AdminSchema = new mongoose.Schema({
  email: String,
  password: String
});

const JobPost = mongoose.model<IAdmin>('Admin', AdminSchema);
export default JobPost;