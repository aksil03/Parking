import { createFactory } from 'hono/factory';
import { Database } from 'bun:sqlite';
import ReadOneCityView from '../../views/city/ReadOneCityView';
import City from '../../models/City';
import Parking from '../../models/Parking';
import { HTTPException } from 'hono/http-exception'; 

const factory = createFactory();

const handlers = factory.createHandlers(async (c) => {

    // slug de l'url
    const slug = c.req.param('slug');

    // connexion
    const db = new Database('database.sqlite');

    try {
        // recupere la ville
        const results = await db.query(`SELECT * FROM cities WHERE slug = "${slug}"`);
        const cityData = results.get() as any; 

        // instance de city
        const city = new City(
            cityData.name,
            cityData.country,
            {
                latitude: parseFloat(cityData.location.split(', ')[0]),
                longitude: parseFloat(cityData.location.split(', ')[1]),
            }
        );

        // tout les parkings
        const parkingResults = await db.query('SELECT * FROM parkings');
        const parkingsData = parkingResults.all() as any[]; 

        // filtrer les bon parkings
        const cityParkings = parkingsData.filter(parking => parking.city_id === cityData.id);

        // instance d eparking
        const parkings = cityParkings.map((parkingData: any) => new Parking(
            parkingData.name,
            parkingData.numberOfSpots,
            parkingData.opened,
            parkingData.hourlyRate,
            parkingData.city_id,
            parkingData.location ? {
                latitude: parseFloat(parkingData.location.split(', ')[0]),
                longitude: parseFloat(parkingData.location.split(', ')[1]),
            } : undefined
        ));

        // view
        const html = ReadOneCityView({ city, parkings });
        return c.html(html);

    } catch (error) {
        throw new HTTPException(500); 
    } 
});

export default {
    handlers,
};