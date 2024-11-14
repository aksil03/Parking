import { Hono } from 'hono';
import { serveStatic } from 'hono/bun';
import HomeController from './controllers/HomeController';
import adminRoutes from './routes/adminRoutes';
import loginRoutes from './routes/loginRoutes';
import logoutRoute from './routes/logoutRoutes';
import cityRoutes from './routes/cityRoutes';
import parkingRoutes from './routes/parkingRoutes';
import { NotFoundPage } from './views/erreurs/404';
import { ServerErrorPage } from './views/erreurs/500';
import { HTTPException } from 'hono/http-exception';
import { UnauthorizedPage } from './views/erreurs/401';

const app = new Hono();

app.use('/static/*', serveStatic({ root: './' }));

app.get('/', ...HomeController.handlers);
app.route('/admin', adminRoutes);
app.route('/', loginRoutes);
app.route('/', logoutRoute); 
app.route('/', adminRoutes);
app.route('/', cityRoutes); 
app.route('/', parkingRoutes);

// erreurs
app.onError(async (err, c) => {
  const status = err instanceof HTTPException ? err.status : 500;

  // 401
  if (status === 401) {
    const html = UnauthorizedPage();
    return c.html(html, 401);
  }
  
  // 404
  if (status === 404) {
    const html = NotFoundPage(); 
    return c.html(html, 404);
  }

  // autre = 500
  const html = ServerErrorPage(); 
  return c.html(html, 500);
});

// Route pour 404 pour toutes routes non définis
app.get('*', async (c) => {
  throw new HTTPException(404); 
});

export default app;