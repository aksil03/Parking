import { toSlug } from '../utils/toSlug';
import { GPS } from '../types/GPS'; 

export default class  City {
    //optionel car auto incrémenter dans la bdd
    id?: number; 
    name: string;
    slug: string;
    location: GPS; 
    country: string;

    constructor(name: string, country: string, location: GPS, id?: number) {
        this.name = name;
        this.slug = toSlug(name); 
        this.country = country;
        this.location = location;
        this.id = id; 
    }
}