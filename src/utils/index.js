import {
    FAILURE, REQUEST, RESET, SUCCESS,
} from "../constants"

export const createRequestTypes = base => {
    return [RESET, REQUEST, SUCCESS, FAILURE].reduce((acc, type) => {
        acc[type] = `${base}_${type}`;
        return acc;
    }, {});
};

export const setFavoriteLocalStorage = (personObject) => {
    const favoriteObject = JSON.parse(localStorage.getItem("favorite")) || {};
    if (!favoriteObject[personObject?.url]) favoriteObject[personObject.url] = personObject;
    localStorage.setItem("favorite", JSON.stringify(favoriteObject))
}

export const getFavoriteLocalStorage = (url) => {
    try {
        const favoriteObject = JSON.parse(localStorage.getItem("favorite")) || {};
        if (!favoriteObject[url]) return false;
        return true;
    } catch (error) {
        return false
    }
}

export const removeFavoriteLocalStorage = (url) => {
    const favoriteObject = JSON.parse(localStorage.getItem("favorite")) || {};
    const newObject = {}
    Object.keys(favoriteObject).forEach(keys => {
        if (keys !== url) newObject[keys] = favoriteObject[keys]
    })
    localStorage.setItem("favorite", JSON.stringify(newObject))
}


export const getFavoriteListLocalStorage = () => {
    try {
        return JSON.parse(localStorage.getItem("favorite")) || {};
    } catch (error) {
        localStorage.removeItem("favorite")
        return null
    }
}

export const updateWholeFavoriteLocalStorage = (object) => {
    localStorage.setItem("favorite", JSON.stringify(object));
}