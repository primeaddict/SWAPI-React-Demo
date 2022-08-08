
import { FILMS_DETAILS, PERSON_DETAILS, PERSON_LIST, PLANET, STARSHIP_DETAILS } from "./types"
import { REQUEST } from "../constants"

export const a__getPeopleList = (url = "") => {
    return ({
        type: PERSON_LIST[REQUEST],
        payload: url
    })
}

export const a__getHomePlanet = (planetUrl) => {
    return ({
        type: PLANET[REQUEST],
        payload: planetUrl
    })
}

export const a__getPersonDetail = (personUrl) => {
    return ({
        type: PERSON_DETAILS[REQUEST],
        payload: personUrl
    })
}

export const a__getFilmsDetail = (filmsUrls) => {
    return ({
        type: FILMS_DETAILS[REQUEST],
        payload: filmsUrls
    })
}

export const a__getStarShipDetail = (starShipUrls) => {
    return ({
        type: STARSHIP_DETAILS[REQUEST],
        payload: starShipUrls
    })
} 