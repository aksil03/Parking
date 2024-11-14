import { expect, test } from "bun:test";
import { generateRandomNumberId } from "../src/utils/generateRandomNumberId";

// tester si le nombre est plus grand que le plus grand nombre a 5 chiffre
test("le nombre est supérieur a 99999", () => {
    expect(generateRandomNumberId()).toBeGreaterThan(99999);
});

// tester si le nombre est plus petit que le plus petit nombre a 7 chiffre
test("le nombre est inferieur a 1000000", () => {
    expect(generateRandomNumberId()).toBeLessThan(1000000);
});