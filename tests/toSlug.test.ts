import { expect, test } from "bun:test";
import { toSlug } from "../src/utils/toSlug";

//test de l'exemple du TD
test("retourne 'je-suis-un-cas-d-ecole", () => {
    expect(toSlug("Je suis un cas d'école")).toBe("je-suis-un-cas-d-ecole");
});

// Majuscule, caractère spéciaux et accents
test("Retourne 'ceci-est-un-test", () => {
    expect(toSlug("CEcI$eSt un%tèst")).toBe("ceci-est-un-test");
});