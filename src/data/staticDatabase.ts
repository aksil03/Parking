import  City  from '../models/City';
import  Parking  from '../models/Parking';

// Creation des villes avant les parking car on ne peut pas placer un parking dans une ville inexistante
const aixEnProvence = new City("Aix-en-Provence", "France", { latitude: 43.533329, longitude: 5.43333 });
const laSpezia = new City("La Spezia", "Italie", { latitude: 44.238366, longitude: 9.6912326 });
const aixLaChapelle = new City("Aix-la-Chapelle", "Allemagne", { latitude: 50.776351, longitude: 6.083862 });
const sanCristobal = new City("San Cristóbal de La Laguna", "Espagne", { latitude: 28.487180709838867, longitude: -16.313879013061523 });
const newcastle = new City("Newcastle upon Tyne", "Angleterre", { latitude: 54.9738474, longitude: -1.6131572 });

// liste des villes doit etre créer ausssi avant pour l'utilisation de cityId
export const cities = [aixEnProvence, laSpezia, aixLaChapelle, sanCristobal, newcastle];


// création des parking, inutile de renseignée la localisation, le code la recupere automatiquement via la ville associée
const parkingA = new Parking("Parking A", aixEnProvence.id, 100, true, 4.5);
const parkingB = new Parking("Parking B", laSpezia.id, 50, true, 3);  
const parkingC = new Parking("Parking C", laSpezia.id, 80, true, 2.5);  
const parkingD = new Parking("Parking D", aixLaChapelle.id, 40, true, 2.8); 
const parkingE = new Parking("Parking E", sanCristobal.id, 70, true, 3.1);  
const parkingF = new Parking("Parking F", newcastle.id, 60, true, 2.4);
const parkingG = new Parking("Parking G", newcastle.id, 90, true, 3.2);  

// liste de parking
export const parkings = [parkingA, parkingB, parkingC, parkingD, parkingE, parkingF, parkingG];
