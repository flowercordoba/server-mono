import { Router } from 'express';
import { AuthMiddleware } from '@globals/helpers/auth-middleware';
import { CreatePostController } from '../controllers/create-post';
import { GetPostsController } from '../controllers/get-posts';
import { UpdatePostController } from '../controllers/update-post';
import { DeletePostController } from '../controllers/delete-post';

const router = Router();
const createPostController = new CreatePostController();
const getPostsController = new GetPostsController();
const updatePostController = new UpdatePostController();
const deletePostController = new DeletePostController();

// Rutas para crear posts
router.post('/', AuthMiddleware.validateJWT, createPostController.createPost);
router.post('/post-with-image', AuthMiddleware.validateJWT, createPostController.createPostWithImage);
router.post('/post-with-video', AuthMiddleware.validateJWT, createPostController.createPostWithVideo);

// // Rutas para obtener posts
router.get('/', AuthMiddleware.validateJWT, getPostsController.getPostsByUser); // Ajuste aquí
router.get('/:postId', AuthMiddleware.validateJWT, getPostsController.getPostById);

// // Rutas para actualizar posts
router.put('/:postId', AuthMiddleware.validateJWT, updatePostController.updatePost);

// // Rutas para eliminar posts
router.delete('/:postId', AuthMiddleware.validateJWT, deletePostController.deletePost);

export default router;
