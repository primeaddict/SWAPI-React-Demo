import { FAILURE, REQUEST, SUCCESS } from "../../../constants";
import { FILMS_DETAILS, PERSON_DETAILS, PERSON_LIST, STARSHIP_DETAILS } from "../../types"

const initialState = {
    peoples: {}
}

const peopleReducer = (state = initialState, action) => {

    switch (action.type) {
        case FILMS_DETAILS[REQUEST]:
        case STARSHIP_DETAILS[REQUEST]:
        case PERSON_DETAILS[REQUEST]:
        case PERSON_LIST[REQUEST]:
            {
                return { ...state, loading: true }
            }
        case PERSON_LIST[SUCCESS]: {

            const peoples = state.peoples || {}
            const url = action.payload.url;
            peoples[url] = action?.payload
            console.log("🚀 ~ file: people.js ~ line 23 ~ peopleReducer ~ peoples", peoples)

            const list = action.payload.results;

            return { ...state, ...action.payload, list, loading: false, }
        }
        case PERSON_DETAILS[SUCCESS]: {
            return { ...state, personDetails: action.payload, loading: false }
        }
        case FILMS_DETAILS[SUCCESS]: {
            return { ...state, personDetails: { ...state.personDetails, filmsData: action.payload }, loading: false }
        }
        case STARSHIP_DETAILS[SUCCESS]: {
            return { ...state, personDetails: { ...state.personDetails, starShipData: action.payload }, loading: false }
        }
        case PERSON_LIST[FAILURE]:
        case PERSON_DETAILS[FAILURE]:
            return { ...state, error: action.payload, loading: false };

        default:
            return { ...state, loading: false };
    }
}
export default peopleReducer