import { Hono } from 'hono';
import { deleteCookie } from 'hono/cookie';

const logoutRoute = new Hono();

// supprime le cookie ce qui deconnecte l'utilisateur
logoutRoute.get('/logout', (c) => {
  deleteCookie(c, 'token'); 
  return c.redirect('/');
});

export default logoutRoute;