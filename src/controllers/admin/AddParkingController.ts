import { createFactory } from 'hono/factory';
import AddParkingView from '../../views/admin/AddParkingView';
import Parking from '../../models/Parking';
import Spot from '../../models/Spot';
import City from '../../models/City';
import { Database } from 'bun:sqlite';
import { GPS } from '../../types/GPS';
import { HTTPException } from 'hono/http-exception'; 

const factory = createFactory();

const handlers = factory.createHandlers(async (c) => {

    // Connexion à la base de données
    const db = new Database('database.sqlite');

    // Si la requête est POST
    if (c.req.method === 'POST') {
        try {
            // Données du formulaire
            const formData = await c.req.formData();
            const parkingName = formData.get('parkingName')?.toString() || '';
            const latitude = parseFloat(formData.get('latitude')?.toString() || 'NaN');
            const longitude = parseFloat(formData.get('longitude')?.toString() || 'NaN');
            const numberOfSpots = parseInt(formData.get('numberOfSpots')?.toString() || '0');
            const hourlyRate = parseFloat(formData.get('hourlyRate')?.toString() || '0');
            const cityId = parseInt(formData.get('cityId')?.toString() || '0');
            const opened = formData.get('opened') === 'true';

            let location: GPS;

            // Si la location est renseigné
            if (!isNaN(latitude) && !isNaN(longitude)) {
                location = { latitude, longitude };
            } else {
                // Prendre la location de la ville associé
                const cityBdd = db.query("SELECT location FROM cities WHERE id = ?").get(cityId) as { location: string };
                    const [lat, long] = cityBdd.location.split(',').map(Number);
                    location = { latitude: lat, longitude: long };
            }

            // Récupérer les informations de la ville pour création de l'instance de City
            const cityBdd = db.query("SELECT name, country FROM cities WHERE id = ?").get(cityId) as { name: string; country: string };

            if (!cityBdd) {
                throw new Error(`Ville inexistante`);
            }

            // instance de city
            const city = new City(cityBdd.name, cityBdd.country, location!, cityId);

            // instance de parking
            const parking = new Parking(parkingName, numberOfSpots, opened, hourlyRate, city.id!, location);

            // Insertion
            await db.run(`
                INSERT INTO parkings (name, location, numberOfSpots, opened, hourlyRate, city_id)
                VALUES (?, ?, ?, ?, ?, ?);
            `, [
                parking.name,
                location ? `${location.latitude}, ${location.longitude}` : null,
                parking.numberOfSpots,
                opened ? 1 : 0, 
                parking.hourlyRate,
                parking.cityId
            ]);

            // Récupérer l'ID du parking récemment créé
            const result = db.query('SELECT last_insert_rowid() AS id').get() as { id: number };
            const parkingId = result.id;

            // création des spots
            for (let i = 0; i < parking.numberOfSpots; i++) {
                const spot = new Spot(parkingId);
                await db.run(`
                    INSERT INTO spots (parking_id) VALUES (?);
                `, [spot.parkingId]);
            }

            // message de reussite
            const success = "Parking ajouté 🙂";
            const cities = db.query("SELECT id, name FROM cities").all() as { id: number; name: string }[];
            return c.html(AddParkingView(success, cities));
        } catch (error) {
            throw new HTTPException(500);
        }
    }

    // Si GET
    const cities = db.query("SELECT id, name FROM cities").all() as { id: number; name: string }[];
    return c.html(AddParkingView(null, cities));
});


export default {
    handlers
};