export  default class Park {
    id: string; 
    startedAt: string; 
    endedAt: string; 
    vehicleNumberPlate: string; 
    spotId: number; 
    price: number; 

    constructor(id: string, startedAt: string, spotId: number, price: number, endedAt: string, vehicleNumberPlate: string) {
        this.id = id;
        this.startedAt = startedAt;
        this.spotId = spotId;
        this.price = price;
        this.endedAt = endedAt;
        this.vehicleNumberPlate = vehicleNumberPlate;
    }
}