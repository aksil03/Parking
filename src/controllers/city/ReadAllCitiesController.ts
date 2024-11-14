import { createFactory } from 'hono/factory';
import ReadAllCitiesView from '../../views/city/ReadAllCitiesView';
import { Database } from 'bun:sqlite';
import City from '../../models/City'; 
import { HTTPException } from 'hono/http-exception'; 

// Création de l'instance de factory
const factory = createFactory();

// Requêtes 
const handlers = factory.createHandlers(async (c) => {

    // connexion
    const db = new Database('database.sqlite'); 

    try {
        // Récupére les villes
        const citiesData = await db.query('SELECT * FROM cities').all();

        // instance de city
        const cities = citiesData.map((cityData: any) => new City(
            cityData.name,
            cityData.country,
            {
                latitude: parseFloat(cityData.location.split(', ')[0]),
                longitude: parseFloat(cityData.location.split(', ')[1]),
            },
            cityData.id 
        ));

        // utiliser la view
        const html = ReadAllCitiesView({ cities });
        return c.html(html); 
    } catch (error) {
        throw new HTTPException(500); 
    } 
});

export default {
    handlers
};