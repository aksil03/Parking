import { createFactory } from 'hono/factory'; 
import { logger } from 'hono/logger'; 
import { HTTPException } from 'hono/http-exception'; 
import { sign } from 'hono/jwt'; 
import { setCookie } from 'hono/cookie'; 
import LoginView from '../../views/login/LoginView'; 

const factory = createFactory();

// Peut etre améliorer en inserant les donnée utilisateur dans la bdd
const showLoginPage = factory.createHandlers(
  logger(),
  (c) => {
    return c.html(LoginView()); 
  }
);

// Gestionnaire pour traiter la soumission du formulaire de connexion
const processLogin = factory.createHandlers(
  logger(),
  async (c) => {
    // Extraction des données
    const { pseudo, password } = await c.req.parseBody();

    const correctPseudo = 'admin'; 
    const correctPassword = 'admin'; 

    // authentification fausse
    if (pseudo !== correctPseudo || password !== correctPassword) {
      throw new HTTPException(401);
    }

    // Création du token et expiration pour sécurité
    const payload = { pseudo, exp: Math.floor(Date.now() / 1000) + 60 * 60 }; 
    //clé de signature
    const token = await sign(payload, 'tdWeb'); 

    // protege le token via un cookie
    setCookie(c, 'token', token, { httpOnly: true });

    // page d'acceuil
    return c.redirect('/'); 
  }
);

export default {
  handlers: {
    showLoginPage, 
    processLogin,  
  },
};