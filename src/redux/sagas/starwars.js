import axios from "axios";
import { put, takeEvery, takeLatest } from "redux-saga/effects"
import { API_ALL_PEOPLE, SUCCESS, FAILURE, REQUEST } from "../../constants";
import { FILMS_DETAILS, PERSON_DETAILS, PERSON_LIST, PLANET, STARSHIP_DETAILS } from "../types"

function* getPeopleList(data) {
    try {
        const url = data.payload || API_ALL_PEOPLE
        const response = yield axios.get(url)
        yield put({ type: PERSON_LIST[SUCCESS], payload: { ...response.data, url } })
    } catch (error) {
        yield put({ type: PERSON_LIST[FAILURE], payload: "Error in fetching people list...!" })
    }
}

function* getPlanet(data) {
    try {
        const response = yield axios.get(data.payload)
        yield put({ type: PLANET[SUCCESS], payload: { url: data.payload, data: response.data } })
    } catch (error) {
        yield put({ type: PLANET[FAILURE], payload: "Error in fetching people list...!" })
    }
}


function* getPeopleDetails(data) {
    try {
        const response = yield axios.get(data.payload)
        yield put({ type: PERSON_DETAILS[SUCCESS], payload: response.data })
    } catch (error) {
        yield put({ type: PERSON_DETAILS[FAILURE], payload: "Error in fetching people details...!" })
    }
}


function* getPeopleFilmDetails(data) {
    try {
        const response = yield Promise.all(data.payload.map(url => axios.get(url)))
        const responseData = yield response.map(res => res.data)
        yield put({ type: FILMS_DETAILS[SUCCESS], payload: responseData })
    } catch (error) {
        yield put({ type: FILMS_DETAILS[FAILURE], payload: "Error in fetching people film details...!" })
    }
}

function* getPeopleStarShipDetails(data) {
    try {
        const response = yield Promise.all(data.payload.map(url => axios.get(url)))
        const responseData = yield response.map(res => res.data)
        yield put({ type: STARSHIP_DETAILS[SUCCESS], payload: responseData })
    } catch (error) {
        yield put({ type: STARSHIP_DETAILS[FAILURE], payload: "Error in fetching people starship details...!" })
    }
}
export const starWarsSagas = {
    watchGetPeopleList: takeLatest(PERSON_LIST[REQUEST], getPeopleList),
    watchGetPlanet: takeEvery(PLANET[REQUEST], getPlanet),
    watchGetPeopleDetails: takeLatest(PERSON_DETAILS[REQUEST], getPeopleDetails),
    watchGetPeopleFilmDetails: takeLatest(FILMS_DETAILS[REQUEST], getPeopleFilmDetails),
    watchGetPeopleStarShipDetails: takeLatest(STARSHIP_DETAILS[REQUEST], getPeopleStarShipDetails),
}