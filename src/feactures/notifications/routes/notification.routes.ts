import { Router } from 'express';
import { NotificationController } from '../controllers/notification.controller';
import { AuthMiddleware } from '@globals/helpers/auth-middleware';

const router: Router = Router();
const notificationController = new NotificationController();

router.post('/',AuthMiddleware.validateJWT, notificationController.createNotification);
router.get('/:userId',AuthMiddleware.validateJWT, notificationController.getNotificationsByUser);

router.put('/:notificationId/read', notificationController.markAsRead);
router.delete('/:notificationId', notificationController.deleteNotification);


export default router;
