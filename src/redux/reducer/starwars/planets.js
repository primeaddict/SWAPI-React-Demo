import { FAILURE, REQUEST, SUCCESS } from "../../../constants";
import { PLANET } from "../../types";



const initialState = {
    planets: {}
}

const planetReducer = (state = initialState, action) => {

    switch (action.type) {
        case PLANET[REQUEST]: {
            return { ...state, loading: true }
        }

        case PLANET[SUCCESS]: {

            const planetObject = state.planets;
            const url = action.payload.url
            const data = action.payload.data
            if (!planetObject[url]) planetObject[url] = data

            return { planets: planetObject, loading: false }

        }

        case PLANET[FAILURE]:
            return { error: "Error fetching planet...!", loading: false }
        default:
            return { ...state }
    }
}

export default planetReducer