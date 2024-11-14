import { Hono } from 'hono';
import LoginController from '../controllers/login/LoginController';

const loginRoutes = new Hono();

// affiche
loginRoutes.get('/login', ...LoginController.handlers.showLoginPage);

// traite
loginRoutes.post('/login', ...LoginController.handlers.processLogin);

export default loginRoutes;