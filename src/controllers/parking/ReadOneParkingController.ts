import { createFactory } from 'hono/factory'; 
import ReadOneParkingView from '../../views/parking/ReadOneParkingView'; 
import { Database } from 'bun:sqlite'; 
import Parking from '../../models/Parking'; 
import City from '../../models/City'; 
import Spot from '../../models/Spot'; 
import { HTTPException } from 'hono/http-exception'; 

const factory = createFactory();

const handlers = factory.createHandlers(async (c) => {
    
    // Connexion
    const db = new Database('database.sqlite');

    try {
        // récupere l'id
        const parkingId = parseInt(c.req.param('id'), 10);

        // parking correspondant
        const parkingResults = await db.query(`SELECT * FROM parkings WHERE id = ${parkingId}`);
        const parkingData = parkingResults.get() as any; 

        // Spots du parking
        const spotsResults = await db.query(`SELECT * FROM spots WHERE parking_id = ${parkingId}`);
        const spotsData = spotsResults.all() as any[]; 

        // ville du parking
        const cityResults = await db.query(`SELECT * FROM cities WHERE id = ${parkingData.city_id}`);
        const cityData = cityResults.get() as any; 

        // instance de parking
        const parking = new Parking(
            parkingData.name, 
            parkingData.numberOfSpots, 
            parkingData.opened, 
            parkingData.hourlyRate, 
            parkingData.city_id,
            parkingData.location ? {
                latitude: parseFloat(parkingData.location.split(', ')[0]), 
                longitude: parseFloat(parkingData.location.split(', ')[1]), 
            } : undefined,
            parkingData.id 
        );

        // instance de city
        const city = new City(
            cityData.name, 
            cityData.country, 
            {
                latitude: parseFloat(cityData.location.split(', ')[0]),
                longitude: parseFloat(cityData.location.split(', ')[1]), 
            },
            cityData.id 
        );

        // instance de spot
        const spots = spotsData.map(spotData => new Spot(
            parkingId, 
            spotData.id 
        ));

        // View
        const html = ReadOneParkingView({ parking, city, spots });
        return c.html(html);
    } catch (error) {
        throw new HTTPException(500);
    }
});

export default {
    handlers
};