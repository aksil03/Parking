import City from '../../models/City';
import { Layout } from '../shared/Layout';
import { html } from 'hono/html';

// genere la vue et le tableau de city
const ReadAllCitiesView = ({ cities }: { cities: Array<City> }) => {

  // ajoute les attributs voulu sur mes cartes et une redirection vers la ville choisis
  const cityListItems = cities.map((city) => html`
    <li class="city-item">
      <a href="/cities/${city.slug}" class="city-card"> 
        <span class="city-name">${city.name}</span>
        <span class="country">${city.country}</span>
      </a>
    </li>
  `);

  // utilise le layout
  return Layout({
    pageTitle: 'Liste des Villes',
    cssFile: '/static/AllCity.css', 
    children: html`
      <div class="container">
        <div class="header">
          <h1>Liste des Villes</h1>
          <div class="search-container">
            <input
              type="text"
              id="search-bar"
              placeholder="Ecrivez une ville"
              oninput="filterCities()"
            />
          </div>
        </div>
        <ul class="city-list">${cityListItems}</ul>
        <a href="/" class="return-button">Retour</a>
      </div>
      <script>
        function filterCities() {
          const input = document.getElementById("search-bar").value.toLowerCase(); 
          document.querySelectorAll(".city-item").forEach(city => {
          city.style.display = city.querySelector(".city-name")?.textContent.toLowerCase().includes(input) || input === "" ? "flex" : "none"; 
        });
      }
      </script>

    `,
  });
};

export default ReadAllCitiesView;