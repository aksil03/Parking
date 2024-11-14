import { Layout } from '../shared/Layout';
import { html } from 'hono/html';

export default function AdminView() {
    return Layout({
        pageTitle: 'Administration - EuroPark',
        cssFile: '/static/Admin.css',
        children: html`
            <div class="container">
                <h1>Administration</h1>
                <p>Que voulez-vous ajouter ?</p>
                <div class="button-container">
                    <a href="/admin/add-city" class="button">Ajouter une Ville</a>
                    <a href="/admin/add-parking" class="button">Ajouter un Parking</a>
                </div>
                <a href="/" class="return-button">Retour</a>
            </div>
        `,
    });
}