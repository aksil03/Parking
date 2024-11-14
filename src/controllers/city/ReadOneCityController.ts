import { createFactory } from 'hono/factory'; 
import ReadOneCityView from '../../views/city/ReadOneCityView'; 
import { HTTPException } from 'hono/http-exception'; 

// instance
const factory = createFactory();

// requetes 
const handlers = factory.createHandlers(async (c) => {
  // récupere le slug
  const slug = c.req.param('slug'); 

  // Récupérer les villes et parkings depuis l'index
  const cities = c.get('cities'); 
  const parkings = c.get('parkings'); 

  // Trouver la ville correspondante au slug
  let city = null;
    for (const c of cities) {
      if (c.slug === slug) {
         city = c;
         break; 
    }
  }

  // Exception si la ville existe pas
  if (!city) {
    throw new HTTPException(404); 
  }

  // view OneCity
  const html = ReadOneCityView({ city, parkings }); 
  return c.html(html); 
});

// Export
export default {
  handlers,
};