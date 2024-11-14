import { Layout } from '../shared/Layout';
import { html } from 'hono/html';
import Parking from '../../models/Parking';
import City from '../../models/City'; 

const ReadOneParkingView = ({ parking, cities }: { parking: Parking; cities: City[] }) => {

   // ville correspondante
   let city;
   for (const c of cities) {
     if (c.id === parking.cityId) {
     city = c;
     break; 
     }
    }

  // récupere le nom
  const cityName = city ? city.name : 'Inconnu'; 

  // coordonnées GPS
  const { latitude, longitude } = parking.location;

  // layout
  return Layout({
    pageTitle: `Détails du Parking: ${parking.name}`,
    cssFile: '/static/OneParking.css',
    children: html`
      <div class="parking-details" id="parking-details">
        <h1>${parking.name}</h1>
        <p><strong>ID:</strong> ${parking.id}</p>
        <p><strong>Location:</strong> ${latitude}, ${longitude}</p>
        <p><strong>Nombre de places:</strong> ${parking.numberOfSpots}</p>
        <p><strong>Ouvert:</strong> ${parking.opened ? 'Oui' : 'Non'}</p>
        <p><strong>Taux horaire:</strong> ${parking.hourlyRate} €</p>
        <p><strong>Ville:</strong> ${cityName}</p>
        <p><strong>Identifiants des places:</strong> ${parking.parkIds.join(', ')}</p>
        <a href="/parkings"  class="return-button">Retour à la liste des parkings</a>
      </div>

      <script>
          // apparition
          requestAnimationFrame(() => {
            document.querySelector(".parking-details").classList.add("show");
          });
      </script>
    `,
  });
};

export default ReadOneParkingView;