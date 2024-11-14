import { html } from "hono/html";

type Props = {
  children: any;
  pageTitle: string; 
  cssFile?: string; // Ajout d'un fichier css optionel pour eviter les probleme d'affichage
};

export const Layout = ({ children, pageTitle, cssFile }: Props) => html`
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>${pageTitle}</title>
      ${cssFile ? html`<link rel="stylesheet" href="${cssFile}" onload="this.rel='stylesheet'" />` : ''}
      <noscript>${cssFile ? html`<link rel="stylesheet" href="${cssFile}" />` : ''}</noscript>
    </head>
    <body>
      ${children}
    </body>
  </html>
`;