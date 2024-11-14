import { Layout } from '../shared/Layout';
import { html } from 'hono/html';

// view error 404
export const NotFoundPage = () => {
    return Layout({
      pageTitle: 'Error 404',
      cssFile: '/static/404.css', 
      children: html`
      <div class="container">
        <h1>404 - Error</h1>
        <p>Petit problème! la page n'existe pas 🥲</p>
        <p><a href="/"  class="return-button">Retour</a></p>
      </div>
      `,
    });
  };
  