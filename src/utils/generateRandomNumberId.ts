export function generateRandomNumberId(): number {
    // plus petit nombre a 6 chiffre
    const min = 100000

    // plus grand nomnbre a 6 chiffre
    const max = 999999

    // prendre un nombre au hasard dans cette espace
    return Math.floor(Math.random() * (max - min + 1)) + min;
}