import { Application } from 'express';
import { AuthRoutes } from './feactures/auth/routes/authRoutes';
import { currentUserRoutes } from './feactures/auth/routes/currentRoutes';

const BASE_AUTH = '/api/v1/auth';
const BASE_USER = '/api/v1/user';
// const BASE_PATH = '/api/v1';

export default (app: Application) => {
  const routes = () => {
    app.use(BASE_AUTH, AuthRoutes.routes);
    app.use(BASE_AUTH, currentUserRoutes.routes());

    // user routes
    app.use(BASE_USER, currentUserRoutes.routes());
  };
  routes();
};
