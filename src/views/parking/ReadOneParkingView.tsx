import { Layout } from '../shared/Layout';
import { html } from 'hono/html';
import Parking from '../../models/Parking';
import City from '../../models/City'; 
import Spot from '../../models/Spot'; 

const ReadOneParkingView = ({ parking, city, spots }: { parking: Parking; city: City; spots: Spot[] }) => {

    // Coordonnées GPS
    const { latitude, longitude } = parking.location || { latitude: 'Inconnu', longitude: 'Inconnu' };

    // Récupérer les identifiants des spots
    const spotIds = spots.map(spot => spot.id).join(', ');

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
                <p><strong>Ville:</strong> ${city.name}</p>
                <p><strong>Pays:</strong> ${city.country}</p>
                <p><strong>Identifiants des places:</strong> ${spotIds.length > 0 ? spotIds : 'Aucun'}</p>
                <a href="/parkings" class="return-button">Retour à la liste des parkings</a>
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