import { GPS } from '../types/GPS';

export default class Parking {
    id?: number; 
    name: string;
    location?: GPS; 
    numberOfSpots: number; 
    opened: boolean; 
    hourlyRate: number; 
    cityId: number; 

    constructor(name: string, numberOfSpots: number, opened: boolean, hourlyRate: number, cityId: number, location?: GPS, id?: number) {
        this.name = name;
        this.numberOfSpots = numberOfSpots;
        this.opened = opened;
        this.hourlyRate = hourlyRate;
        this.cityId = cityId;
        this.location = location; 
        this.id = id; 
    }
}