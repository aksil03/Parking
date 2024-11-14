import { generateRandomNumberId } from "../utils/generateRandomNumberId";

export default class Spot {
    id: number;
    parkingId: number;

    constructor(parkingId: number) {
        this.id = generateRandomNumberId();
        this.parkingId = parkingId;
    }
}