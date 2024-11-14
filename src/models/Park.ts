import { generateRandomNumberId } from "../utils/generateRandomNumberId";

export default class Park {
    id: number;
    spotId: number;
    startedAt: Date;
    endedAt: Date;
    price: number;
    paid: boolean;

    constructor(spotId: number, startedAt: Date, endedAt: Date, price: number, paid: boolean, id?: number) {
            // laisser l'id comme ca selon le prof
            this.id = generateRandomNumberId();

            // demander au prof si il veut qu'on entre manuellement ou non spotId
            this.spotId=spotId;

            if (startedAt >= endedAt) {
                throw new Error("La date de début doit etre inferieur a la date de fin");
            }

            this.startedAt = startedAt;
            this.endedAt = endedAt;

            // le prix est logiquement positif
            if (price < 0) {
                throw new Error("le prix ne peut pas etre négatif");
            }
            this.price = price;
            this.paid = paid;

        }

        
    
}