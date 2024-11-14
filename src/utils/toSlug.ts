export function toSlug(chaine: string): string {
    // minuscule
    let res = chaine.toLowerCase();

    // enleve les accents
    res = res.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    // enleve les caractere speciaux sauf les tirets par des espaces
    res = res.replaceAll(/[`~!@#$%^&*()_|+\=?;:'",.<>\{\}\[\]\\\/]/g, ' ');

    //remplacer espace par des tirets
    res = res.replaceAll(' ', '-')


    return res;

}