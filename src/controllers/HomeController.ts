import { createFactory } from 'hono/factory';
import { logger } from 'hono/logger';

// création de m'instance
const factory = createFactory();

// traitement des requetes et de l'html
const handlers = factory.createHandlers(
  // enregistre les informations
  logger(), 
  (c) => {
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
          </div>
      </body>
      </html>
    `);
  }
);

// constante appelé dans l'index
const HomeController = {
    handlers
};

// exportation pour etre appelé
export default HomeController;