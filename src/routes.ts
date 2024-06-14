import { Application } from 'express';
import { AuthRoutes } from './feactures/auth/routes/authRoutes';
import { currentUserRoutes } from './feactures/auth/routes/currentRoutes';
import notificationRoutes from './feactures/notifications/routes/notification.routes';
import postRoutes from './feactures/post/routes/post.routes';
import friendRoutes from './feactures/friend/routes/friend.routes';
import { userRoutes } from './feactures/user/routes/user.routes';
import { imageRoutes } from './feactures/images/routes/imageRoutes';

const BASE_AUTH = '/api/v1/auth';
const BASE_USER = '/api/v1/user';
const BASE_IMAGES = '/api/v1/images';

const BASE_NOTIFICATION = '/api/v1/notification';
const BASE_POST = '/api/v1/post'; 
const BASE_FRIEND = '/api/v1/friend';


export default (app: Application) => {
  const routes = () => {
    app.use(BASE_AUTH, AuthRoutes.routes);
    app.use(BASE_AUTH, currentUserRoutes.routes());

    app.use(BASE_USER, userRoutes.routes());
    app.use(BASE_IMAGES, imageRoutes.routes());

    
    app.use(BASE_NOTIFICATION, notificationRoutes);
    app.use(BASE_POST, postRoutes);
    app.use(BASE_FRIEND, friendRoutes);



  };
  routes();
};
