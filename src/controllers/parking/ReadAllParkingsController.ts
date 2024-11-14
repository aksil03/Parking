import { createFactory } from 'hono/factory';
import ReadAllParkingsView from '../../views/parking/ReadAllParkingsView';

// instance
const factory = createFactory();

// requetes 
const handlers = factory.createHandlers(async (c) => {
    // Récupérer les parkings et villes dans l'index
    const parkings = c.get('parkings');
    const cities = c.get('cities');

    // view AllParking
    const html = ReadAllParkingsView({ parkings, cities });
    return c.html(html);  
});

// Export
export default {
    handlers
};