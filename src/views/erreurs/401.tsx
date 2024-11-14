import { Layout } from '../shared/Layout';
import { html } from 'hono/html';

// View 401
export const UnauthorizedPage = () => {
    return Layout({
        pageTitle: 'Error 401',
        cssFile: '/static/401.css', 
        children: html`
        <div class="container">
            <h1>401 - Non Autorisé</h1>
            <p>Halte! Vous n'avez pas l'autorisation d'accéder à cette page 👮‍♂️</p>
            <p><a href="/login" class="return-button">Se connecter</a> ou <a href="/" class="return-button">Retour à l'accueil</a></p>
        </div>
        `,
    });
};