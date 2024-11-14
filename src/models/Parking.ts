import { GPS } from "../types/GPS";
import  Spot  from './Spot';
import { cities } from '../data/staticDatabase';
import { generateRandomNumberId } from '../utils/generateRandomNumberId';

export  default class Parking {
    id: number;
    name: string;
    cityId: number;
    location: GPS;
    numberOfSpots: number;
    opened: boolean;
    hourlyRate: number;
    parkIds: number[];

    constructor(name: string, cityId: number, numberOfSpots: number, opened: boolean, hourlyRate: number, id?: number, location?: GPS,) {
        this.id = generateRandomNumberId();
        this.name = name;
        this.cityId = cityId;

        let city;
        // cherche les villes dans la liste de ville
        for (const ville of cities) {
            // si la ville dans la liste a l'id correspondant
            if (ville.id === cityId) {
            //affectation
            city = ville;
            //sortie
            break;
            }
        }
        // si la ville n'existe pas
        if (!city) {
            throw new Error(`L'id que vous avez saisis : ${cityId} n'existe pas`);
        }
        
        this.location = location || city.location;

        // NumberOfSpots doit etre positif
        if (numberOfSpots < 0) {
            throw new Error("Il ne peut pas y avoir un nombre négatif de place");
        }

        this.numberOfSpots = numberOfSpots;
        this.opened = opened;

        // hourlyRate doit etre positif
        if (hourlyRate < 0) {
            throw new Error("l'heure ne peut pas etre négatif");
        }

        this.hourlyRate = hourlyRate;
        this.parkIds = [];


        // création des spots
        for (let i = 0; i < numberOfSpots; i++) {
            const spot = new Spot(cityId); 
            // ajout a la liste
            this.parkIds.push(spot.id); 
        }


        // envoie de l'id du parking
        city.Ajout(this.id);  
        }

}