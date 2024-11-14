import { Layout } from '../shared/Layout';
import { html } from 'hono/html';

// view 500
export const ServerErrorPage = () => {
  return Layout({
    pageTitle: 'Error 500',
    cssFile: '/static/500.css', 
    children: html`
      <div class="container">
        <h1>500 - Error</h1>
        <p>Pas de panique! Il y a un petit problème coté serveur 😬</p>
        <p><a href="/"  class="return-button">Retour</a></p>
      </div>
    `,
  });
};