
export const s__getPlanets = (state) => state?.planet?.planets;
export const s__getPlanetsAll = (state) => state?.planet;

export const s__getPlanetDetails = (state, key) => state?.planet?.planets[key]