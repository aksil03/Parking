import { createFactory } from 'hono/factory';
import { logger } from 'hono/logger'; 
import { getCookie } from 'hono/cookie'; 

const factory = createFactory();

const handlers = factory.createHandlers(
  logger(),
  (c) => { 

    //verifie la connection
    const token = getCookie(c, 'token'); 
    const isConnected = Boolean(token); 

    // si il est connecté ajouter le bouton d'admin
    const adminButton = isConnected
      ? '<a href="/admin" class="button">Admin</a>'
      : ''; 

    //login ou logout en fonction de la connexion ou non
    const authButton = isConnected
      ? '<a href="/logout" class="button">Logout</a>'  
      : '<a href="/login" class="button">Login</a>';  

    return c.html(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8"> 
          <meta name="viewport" content="width=device-width, initial-scale=1.0"> 
          <title>Welcome to EuroPark</title>
          <link rel="stylesheet" href="/static/styles.css"> 
      </head>
      <body>
          <h1>Welcome to EuroPark</h1> 
          <img src="/static/parking.png" alt="Parking Image" /> 
          <p>Save time and money with EuroPark! Enjoy a 100% contactless parking experience for a short or long duration in our car parks in Europe!</p> 
          <div class="button-container">
              <a href="/cities" class="button">Our Cities</a> 
              <a href="/parkings" class="button">Our Car Parks</a> 
              ${adminButton} 
              ${authButton}  
          </div>
      </body>
      </html>
    `);
  }
);

const HomeController = {
    handlers 
};

export default HomeController;