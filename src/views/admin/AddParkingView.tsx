import { Layout } from '../shared/Layout';
import { html } from 'hono/html';

export default function AddParkingView(success: string | null = null, cities: { id: number; name: string }[] = []) {
    return Layout({
        pageTitle: 'Ajouter un Parking',
        cssFile: '/static/AdminAddParking.css',
        children: html`
            <div class="container">
                <h1>Ajouter un Parking</h1>
                <form action="/admin/add-parking" method="POST">
                    <label for="parkingName">Nom du Parking:</label>
                    <input type="text" id="parkingName" name="parkingName" required>

                    <label for="latitude">Latitude (optionnelle):</label>
                    <input type="number" step="any" id="latitude" name="latitude">

                    <label for="longitude">Longitude (optionnelle):</label>
                    <input type="number" step="any" id="longitude" name="longitude">

                    <label for="numberOfSpots">Nombre de Places:</label>
                    <input type="number" id="numberOfSpots" name="numberOfSpots" required>

                    <label for="hourlyRate">Tarif Horaire:</label>
                    <input type="number" step="any" id="hourlyRate" name="hourlyRate" required>

                    <label for="cityId">Ville:</label>
                    <select id="cityId" name="cityId" required>
                        <option value="" disabled selected>Sélectionnez une ville</option>
                        ${cities.map(city => html`<option value="${city.id}">${city.name}</option>`)}
                    </select>

                    <label>Est-ce que le parking est ouvert ?</label><br>
                    <input type="radio" id="openedYes" name="opened" value="true" checked>
                    <label for="openedYes">Oui</label><br>
                    <input type="radio" id="openedNo" name="opened" value="false">
                    <label for="openedNo">Non</label><br>

                    <button type="submit">Ajouter Parking</button>
                </form>
                <a href="/admin" class="return-button">Retour</a>

                ${success ? html`<p class="success-message">${success}</p>` : ''}
            </div>
        `,
    });
}