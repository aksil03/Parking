import { Hono } from 'hono';
import ReadAllParkingsController from '../controllers/parking/ReadAllParkingsController';
import ReadOneParkingController from '../controllers/parking/ReadOneParkingController'; 
import { trimTrailingSlash } from 'hono/trailing-slash';

// instance
const parkingRoutes = new Hono();

// pour accepter les '/' finaux
parkingRoutes.use(trimTrailingSlash());

// creer la route et l'associe au controller
parkingRoutes.get('/parkings', ...ReadAllParkingsController.handlers);

// creer la route et l'associe au controller
parkingRoutes.get('/parkings/:id', ...ReadOneParkingController.handlers); 

// export
export default parkingRoutes;