import { createFactory } from 'hono/factory';
import ReadAllParkingsView from '../../views/parking/ReadAllParkingsView'; 
import { Database } from 'bun:sqlite';
import Parking from '../../models/Parking'; 
import City from '../../models/City'; 
import { HTTPException } from 'hono/http-exception'; 

const factory = createFactory();

const handlers = factory.createHandlers(async (c) => {

    // connexion
    const db = new Database('database.sqlite'); 

    try {
        // tout les parkings
        const parkingsBdd =  await db.query('SELECT * FROM parkings').all();

        // instance de parking
        const parkings = parkingsBdd.map((parkingData: any) => new Parking(
            parkingData.name,
            parkingData.numberOfSpots,
            parkingData.opened === 1, 
            parkingData.hourlyRate,
            parkingData.city_id,
            parkingData.location ? {
                latitude: parseFloat(parkingData.location.split(', ')[0]),
                longitude: parseFloat(parkingData.location.split(', ')[1]),
            } : undefined,
            parkingData.id
        ));

        // toutes les villes
        const citiesBdd = await db.query('SELECT * FROM cities').all();

        // instance de city
        const cities = citiesBdd.map((cityData: any) => new City(
            cityData.name,    
            cityData.country,     
            {                  
                latitude: parseFloat(cityData.location.split(', ')[0]),  
                longitude: parseFloat(cityData.location.split(', ')[1]),
            },
            cityData.id          
        ));

        // view
        const html = ReadAllParkingsView({ parkings, cities });
        return c.html(html); 
    } catch (error) {
        throw new HTTPException(500);
    }
});

export default {
    handlers
};