export  default class Spot {
    id?: number;
    parkingId: number; 

    constructor(parkingId: number, id?: number) {
        this.parkingId = parkingId;
        this.id=id;
    }


}