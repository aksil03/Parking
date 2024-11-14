import City from '../../models/City';
import Parking from '../../models/Parking';
import { Layout } from '../shared/Layout';
import { html } from 'hono/html';

const ReadOneCityView = ({ city, parkings }: { city: City; parkings: Parking[] }) => {
    // Utilise le layout
    return Layout({
        pageTitle: city.name,
        cssFile: '/static/OneCity.css',
        children: html`
            <div class="city-details" id="city-details">
                <h1>${city.name}</h1>
                <p>Pays: ${city.country}</p>
                <p>Coordonnées: ${city.location.latitude}, ${city.location.longitude}</p>
                <h2>Parkings disponibles</h2>
                <ul>
                    ${
                        parkings.length > 0 
                        ? parkings.map(parking => html`<li>${parking.name}</li>`) 
                        : html`<li>Aucun parking disponible</li>`
                    }
                </ul>
                <a href="/cities" class="return-button">Retour à la liste des villes</a>
            </div>
            <script>
                document.querySelector(".city-details").classList.add("show");
            </script>
        `,
    });
};

export default ReadOneCityView;