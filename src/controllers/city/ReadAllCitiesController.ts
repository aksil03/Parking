import { createFactory } from 'hono/factory';
import ReadAllCitiesView from '../../views/city/ReadAllCitiesView';

// Création de l'instance
const factory = createFactory();

// requetes 
const handlers = factory.createHandlers(async (c) => {
    // récupere les villes
    const cities = c.get('cities');  

    // appele la view en lui attribuant les données
    const html = ReadAllCitiesView({ cities }); 
    return c.html(html); 
});

// Export
export default {
    handlers
};