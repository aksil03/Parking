import City from '../../models/City'; 
import Parking from '../../models/Parking'; 
import { Layout } from '../shared/Layout'; 
import { html } from 'hono/html'; 

const ReadAllParkingsView = ({ parkings, cities }: { parkings: Parking[]; cities: City[] }) => {

  // Probleme lors de la création des filtres, on décide donc de dupliquer les fonctions pour séparer le coté serveur du coté client afin que les filtres fonctionne bien
  // fonction appliqué coté serveur

  // tri  par prix
  const sortParkings = (parkings: Parking[]) => parkings.slice().sort((a, b) => a.hourlyRate - b.hourlyRate);

  // filtre les parkings ouvert 
  const filterOpenParkings = (parkings: Parking[], showOnlyOpen: boolean) => showOnlyOpen ? parkings.filter(p => p.opened) : parkings;

  // filtre par nom du parking ou nom de la ville
  const filterParkingsByName = (parkings: Parking[], cities: City[], term: string) =>
    parkings.filter(p => {
      const cityName = cities.find(c => c.id === p.cityId)?.name || '';
      return p.name.toLowerCase().includes(term.toLowerCase()) || cityName.toLowerCase().includes(term.toLowerCase());
    });

  // creer un affichage des parkings
  const renderParkings = (parkings: Parking[], cities: City[], containerId: string) => {
    const parkingList = document.getElementById(containerId);
    if (parkingList) {
      parkingList.innerHTML = parkings.length ? parkings.map(p => {
        const cityName = cities.find(c => c.id === p.cityId)?.name || 'Inconnue';
        return html`<li class="parking-item">
          <a href="/parkings/${p.id}" class="parking-card">
            <h2 class="parking-name">${p.name}</h2>
            <p class="city-name">Ville: ${cityName}</p>
            <p class="number-of-spots">Nombre de places: ${p.numberOfSpots}</p>
            <p class="hourly-rate">Tarif horaire: ${p.hourlyRate} €</p>
            <p class="status">${p.opened ? 'Ouvert' : 'Fermé'}</p>
          </a>
        </li>`;
      }).join('') : '<li>Aucun parking disponible 🥲</li>';
    }
  };

  // met a jour en fonction des filtres
  const updateParkingDisplay = (originalParkings: Parking[], cities: City[]) => {
    const isSorted = (document.getElementById("sort-toggle") as HTMLInputElement).checked;
    const showOnlyOpen = (document.getElementById("filter-open") as HTMLInputElement).checked;
    const searchTerm = (document.getElementById("search-input") as HTMLInputElement).value;

    let displayedParkings = filterOpenParkings(originalParkings, showOnlyOpen);
    displayedParkings = filterParkingsByName(displayedParkings, cities, searchTerm);
    if (isSorted) displayedParkings = sortParkings(displayedParkings);

    renderParkings(displayedParkings, cities, "parking-list");
  };

  // utilise le layout
  return Layout({
    pageTitle: 'Liste des Parkings',
    cssFile: '/static/AllParkings.css',
    children: html`
      <div class="container">
        <h1>Liste des Parkings</h1>
        <input type="text" id="search-input" placeholder="Ecrivez un parking ou une ville" oninput="updateParkingDisplay(${JSON.stringify(parkings)}, ${JSON.stringify(cities)})"/>
        <label>
          <input type="checkbox" id="sort-toggle" onchange="updateParkingDisplay(${JSON.stringify(parkings)}, ${JSON.stringify(cities)})"/>
          Trier par Tarif
        </label>
        <label>
          <input type="checkbox" id="filter-open" onchange="updateParkingDisplay(${JSON.stringify(parkings)}, ${JSON.stringify(cities)})"/>
          Afficher uniquement les parkings ouverts
        </label>
        <ul class="parking-list" id="parking-list">
          ${parkings.length ? parkings.map(p => {
            const cityName = cities.find(c => c.id === p.cityId)?.name || 'Inconnue';
            return html`<li class="parking-item">
              <a href="/parkings/${p.id}" class="parking-card">
                <h2 class="parking-name">${p.name}</h2>
                <p class="city-name">Ville: ${cityName}</p>
                <p class="number-of-spots">Nombre de places: ${p.numberOfSpots}</p>
                <p class="hourly-rate">Tarif horaire: ${p.hourlyRate} €</p>
                <p class="status">${p.opened ? 'Ouvert' : 'Fermé'}</p>
              </a>
            </li>`;
          }) : html`<li>Aucun parking disponible 🥲</li>`}
        </ul>
        <a href="/" class="return-button">Retour</a>
      </div>

      <script>
        // recréaction des fonctions coté client
        function sortParkings(parkings) {
          return parkings.slice().sort((a, b) => a.hourlyRate - b.hourlyRate);
        }
        function filterOpenParkings(parkings, showOnlyOpen) {
          return showOnlyOpen ? parkings.filter(p => p.opened) : parkings;
        }
        function filterParkingsByName(parkings, cities, term) {
          return parkings.filter(p => {
            const cityName = cities.find(c => c.id === p.cityId)?.name || '';
            return p.name.toLowerCase().includes(term.toLowerCase()) || cityName.toLowerCase().includes(term.toLowerCase());
          });
        }
        function renderParkings(parkings, cities, containerId) {
          const parkingList = document.getElementById(containerId);
          if (parkingList) {
            parkingList.innerHTML = parkings.length ? parkings.map(p => {
              const cityName = cities.find(c => c.id === p.cityId)?.name || 'Inconnue';
              return \`<li class="parking-item">
                <a href="/parkings/\${p.id}" class="parking-card">
                  <h2 class="parking-name">\${p.name}</h2>
                  <p class="city-name">Ville: \${cityName}</p>
                  <p class="number-of-spots">Nombre de places: \${p.numberOfSpots}</p>
                  <p class="hourly-rate">Tarif horaire: \${p.hourlyRate} €</p>
                  <p class="status">\${p.opened ? 'Ouvert' : 'Fermé'}</p>
                </a>
              </li>\`;
            }).join('') : '<li>Aucun parking disponible 🥲</li>';
          }
        }
        function updateParkingDisplay(originalParkings, cities) {
          const isSorted = document.getElementById("sort-toggle").checked;
          const showOnlyOpen = document.getElementById("filter-open").checked;
          const searchTerm = document.getElementById("search-input").value;

          let displayedParkings = filterOpenParkings(originalParkings, showOnlyOpen);
          displayedParkings = filterParkingsByName(displayedParkings, cities, searchTerm);
          if (isSorted) displayedParkings = sortParkings(displayedParkings);

          renderParkings(displayedParkings, cities, "parking-list");
        }
      </script>
    `,
  });
};

// export
export default ReadAllParkingsView;