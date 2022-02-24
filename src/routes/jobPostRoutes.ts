import express from 'express';
import {
  createPost,
  deletePost,
  getPosts,
  getSinglePost,
  updatePost
} from '../controllers/jobPosts';

const router = express.Router();

router.get('/', getPosts);
router.get('/:postId', getSinglePost);
router.post('/', createPost);
router.put('/:postId', updatePost);
router.patch('/:postId', updatePost);
router.delete('/:postId', deletePost);

export default router;