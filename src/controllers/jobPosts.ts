import e, { Request, Response } from 'express';
import JobPost from '../models/jobPost'
import { IJobPost } from '../types/jobPost';


export const createPost = async (req: Request, res: Response) => {
  const postData = req.body;
  const newPost = new JobPost(postData);
  try {
    await newPost.save();
    res.status(201).json(newPost);
    console.log('createPost function successful')
  } catch (error: unknown) {
    res.status(409).json({ message: String(error) })
  }
};

export const getPosts = async (req: Request, res: Response) => {
  const allPosts: IJobPost[] = await JobPost.find();
  try {
    res.status(200).json(allPosts);
  } catch (error: unknown) {
    res.status(404).json({ message: String(error) })
  }
};

export const getSinglePost = async (req: Request, res: Response) => {
  const { postId } = req.params;
  const foundPost = await JobPost.findById(postId)
  try {
    foundPost && res.status(200).json(foundPost);
    console.log('getSinglePost function successful')

  } catch (error: unknown) {
    res.status(404).json({ message: String(error) })
  }
};

export const updatePost = async (req: Request, res: Response) => {
  try {
    const { params: {postId}, body } = req;
    const updatedUser: IJobPost | null = await JobPost.findOneAndUpdate({_id: postId}, {$set: body}, {new: true});
    res.status(200).json(updatedUser);
    console.log('updatePost function successful')

  } catch (error: unknown) {
    res.status(404).json({ message: String(error) })
  }

};

export const deletePost = async (req: Request, res: Response) => {
  const { postId } = req.params;
    try {
        const deletedPost = await JobPost.deleteOne({_id: postId});
      res.status(204).json({ message: 'post deleted' });
      console.log('deletePost function successful')
      console.log("post deleted");
    } catch (error: unknown) {
        res.status(403).json({ message: String(error) });
    }
};