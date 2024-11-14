import { Hono } from 'hono';
import { serveStatic } from 'hono/bun';
import { cities, parkings } from './data/staticDatabase';
import HomeController from './controllers/HomeController';
import cityRoutes from './routes/cityRoutes';
import parkingRoutes from './routes/parkingRoutes';
import { NotFoundPage } from './views/erreurs/404'; 
import { ServerErrorPage } from './views/erreurs/500'; 
import { HTTPException } from 'hono/http-exception'; 


// ajout de nouveaux types permettant l'accées a la bdd
declare module 'hono' {
  interface ContextVariableMap {
    cities: typeof cities;
    parkings: typeof parkings;
  }
}

// instance
const app = new Hono();

// pour utiliser l'image
app.use('/static/*', serveStatic({ root: './' }));

// Middleware d'injection pour utiliser via les routes
app.use('*', async (c, next) => {
  c.set('cities', cities);  
  c.set('parkings', parkings); 
  await next();  
});

// page d'acceuil
app.get('/', ...HomeController.handlers);

// Routes des villes et des parkings
app.route('/', cityRoutes);
app.route('/', parkingRoutes);

// Gestion des erreurs
app.onError(async (err, c) => {
  const status = err instanceof HTTPException ? err.status : 500;

  // Si l'erreur est 404 (seul erreur definis dans les controlleurs)
  if (status === 404) {
    const html = NotFoundPage(); 
    return c.html(html, 404);
  // sinon (on ne gere pas les autres type d'erreur)
  } else {
    const html = ServerErrorPage(); 
    return c.html(html, 500);
  }
});

// INUTILE (simplement pour tester l'affichage de l'erreur 500)
app.get('/error', async () => {
  throw new Error('error'); 
});

// Route pour 404 pour toutes routes non définis
app.get('*', async (c) => {
  throw new HTTPException(404, { message: 'Page non trouvée' }); 
});

// Exporter l'application
export default app;