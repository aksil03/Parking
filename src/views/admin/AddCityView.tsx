import { Layout } from '../shared/Layout';
import { html } from 'hono/html';

export default function AddCityView(success: string | null = null) {
    return Layout({
        pageTitle: 'Ajouter une Ville',
        cssFile: '/static/AdminAddCity.css',
        children: html`
            <div class="container">
                <h1>Ajouter une Ville</h1>
                <form action="/admin/add-city" method="POST">
                    <label for="cityName">Nom de la Ville:</label>
                    <input type="text" id="cityName" name="cityName" required>
                    
                    <label for="country">Pays:</label>
                    <input type="text" id="country" name="country" required>
                    
                    <label for="latitude">Latitude:</label>
                    <input type="number" step="any" id="latitude" name="latitude" required>
                    
                    <label for="longitude">Longitude:</label>
                    <input type="number" step="any" id="longitude" name="longitude" required>
                    
                    <button type="submit">Ajouter Ville</button>
                </form>
                <a href="/admin" class="return-button">Retour</a>
                
                ${success ? html`<p class="success-message">${success}</p>` : ''}
            </div>
        `,
    });
}