import { createFactory } from 'hono/factory';
import ReadOneParkingView from '../../views/parking/ReadOneParkingView';
import { HTTPException } from 'hono/http-exception'; 

// instance
const factory = createFactory();

// requetes 
const handlers = factory.createHandlers((c) => {
  // récupere l'id en nombre
  const id = Number(c.req.param('id')); 

  // Récupérer les parkings et villes 
  const parkings = c.get('parkings');
  const cities = c.get('cities');

  // trouve le parking correspondant a l'ID
  let parking = null; 
  for (const p of parkings) { 
    if (p.id === id) {
      parking = p;
      break; 
    }
  }
  

  // erreur parking insexistant
  if (!parking) {
    throw new HTTPException(404); 
  }

  // view OneParking
  const html = ReadOneParkingView({ parking, cities }); 
  return c.html(html); 
});

// Export
export default {
  handlers,
};