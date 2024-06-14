import { Router } from 'express';
import { AuthMiddleware } from '@globals/helpers/auth-middleware';
import { FriendController } from '../controllers/friend.controllers';

const router: Router = Router();
const friendController = new FriendController();

router.post('/', AuthMiddleware.validateJWT, friendController.createFriendRequest);
router.put('/:requestId/accept', AuthMiddleware.validateJWT, friendController.acceptFriendRequest);
router.put('/:requestId/reject', AuthMiddleware.validateJWT, friendController.rejectFriendRequest);
router.get('/:userId', AuthMiddleware.validateJWT, friendController.getFriends);

// 

router.get('/:userId/friends', AuthMiddleware.validateJWT, friendController.getFriends);
router.get('/:userId/friends/:friendId', AuthMiddleware.validateJWT, friendController.getFriendDetails);
router.post('/follow', AuthMiddleware.validateJWT, friendController.followUser);
router.post('/block', AuthMiddleware.validateJWT, friendController.blockUser);
router.post('/unfollow', AuthMiddleware.validateJWT, friendController.unfollowUser);
router.post('/report', AuthMiddleware.validateJWT, friendController.reportUser);


export default router;
