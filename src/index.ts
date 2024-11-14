import { Hono } from 'hono';
import { serveStatic } from 'hono/bun';
import { cities, parkings } from './data/staticDatabase';


// Créez une nouvelle instance de Hono
const app = new Hono();


// Exemple de route JSON
app.get('/', (c) => {
    return c.json({
        cities: cities.map(city => ({
            id: city.id,
            name: city.name,
            country: city.country,
            location: city.location,
            parkings: city.parkingsIds
        })),
        parkings: parkings.map(parking => ({
            id: parking.id,
            name: parking.name,
            cityId: parking.cityId,
            location: parking.location,
            numberOfSpots: parking.numberOfSpots,
            opened: parking.opened,
            hourlyRate: parking.hourlyRate
        }))
    });
});
export default app