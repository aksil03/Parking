import { Hono } from 'hono';
import ReadAllCitiesController from '../controllers/city/ReadAllCitiesController';
import ReadOneCityController from '../controllers/city/ReadOneCityController'; 
import { trimTrailingSlash } from 'hono/trailing-slash'; 

// instance
const cityRoutes = new Hono();

// pour accepter les '/' finaux
cityRoutes.use(trimTrailingSlash()); 

// creer la route et l'associe au controller
cityRoutes.get('/cities', ...ReadAllCitiesController.handlers);

// creer la route et l'associe au controller
cityRoutes.get('/cities/:slug', ...ReadOneCityController.handlers); 

// export
export default cityRoutes;