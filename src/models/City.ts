import { GPS } from "../types/GPS";
import { toSlug } from "../utils/toSlug";
import { generateRandomNumberId } from "../utils/generateRandomNumberId";
import { EventEmitter } from 'events';

export default class City {
    id: number;
    name: string;
    slug: string;
    parkingsIds: number[];
    country: string;
    location: GPS;

    constructor(name: string, country: string, location: GPS) {
        // genere un ID aléatoire
        this.id = generateRandomNumberId();
        this.name = name;
        this.slug = toSlug(name);
        // initialisation vide et incrémenatation a l'instanciation des parkings
        this.parkingsIds = [];
        this.country = country;
        this.location = location;
    }

    // Ajouter l'ID du parking a la liste parkingId
    Ajout(parkingId: number) {
        this.parkingsIds.push(parkingId);
    }
}