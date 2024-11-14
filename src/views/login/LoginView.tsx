import { Layout } from '../shared/Layout';
import { html } from 'hono/html';

const LoginView = () => {
  return Layout({
    pageTitle: 'Login',
    cssFile: '/static/Login.css',
    children: html`
      <div class="container">
        <h1>Login</h1>
        <form action="/login" method="POST">
          <label for="pseudo">Pseudo:</label>
          <input type="text" id="pseudo" name="pseudo" required />
          
          <label for="password">Password:</label>
          <input type="password" id="password" name="password" required />

          <button type="submit">Login</button>
        </form>
        <p><a href="/" class="return-button">Retour</a></p>
      </div>
    `,
  });
};

export default LoginView;