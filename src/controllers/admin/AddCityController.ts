import { createFactory } from 'hono/factory';
import AddCityView from '../../views/admin/AddCityView'; 
import City from '../../models/City';
import { Database } from 'bun:sqlite'; 
import { HTTPException } from 'hono/http-exception';

const factory = createFactory();

const handlers = factory.createHandlers(async (c) => {

    // Connexion à la base de données
    const db = new Database("database.sqlite");

    // Si la requête est POST
    if (c.req.method === 'POST') {
        try {
            // Données du formulaire
            const formData = await c.req.formData(); 
            const cityName = formData.get('cityName')?.toString() || '';
            const country = formData.get('country')?.toString() || ''; 
            const latitude = parseFloat(formData.get('latitude')?.toString() || '0'); 
            const longitude = parseFloat(formData.get('longitude')?.toString() || '0'); 

            // Instancier les données
            const city = new City(cityName, country, { latitude, longitude });

            // Insertion dans la table cities
            const result = await db.run(`
                INSERT INTO cities (name, slug, location, country)
                VALUES (?, ?, ?, ?);
            `, [
                city.name, 
                city.slug, 
                `${city.location.latitude}, ${city.location.longitude}`, 
                city.country 
            ]);


            // Message de succès
            const success = "Ville ajoutée 🙂";
            return c.html(AddCityView(success));

        // erreur
        } catch (error) {
            throw new HTTPException(500);
        }
    }

    // si la methode est GET ne pas inserer le message et ne pas traiter les donnée
    return c.html(AddCityView());
});

export default {
    handlers
};