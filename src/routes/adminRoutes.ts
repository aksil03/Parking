import { Hono } from 'hono';
import AdminController from '../controllers/admin/AdminController';
import AddParkingController from '../controllers/admin/AddParkingController';
import AddCityController from '../controllers/admin/AddCityController';
import { trimTrailingSlash } from 'hono/trailing-slash';
import { getCookie } from 'hono/cookie';
import { HTTPException } from 'hono/http-exception';

const adminRoutes = new Hono();

// pour les /
adminRoutes.use(trimTrailingSlash());

// Middleware pour proteger les routes
adminRoutes.use('/admin/*', async (c, next) => {
  // verifie la connexion
  const token = getCookie(c, 'token'); 
  if (!token) { 
    throw new HTTPException(401); 
  }
  await next(); 
});

// Route d'admin
adminRoutes.get('/admin', ...AdminController.handlers); 

// route qui affiche le formulaire
adminRoutes.get('/admin/add-parking', ...AddParkingController.handlers); 

// Route pour traite l'envoie du formulaire
adminRoutes.post('/admin/add-parking', ...AddParkingController.handlers); 

// Recupere GET
adminRoutes.get('/admin/add-city', ...AddCityController.handlers); 

// traite POST
adminRoutes.post('/admin/add-city', ...AddCityController.handlers); 

export default adminRoutes;