import { combineReducers } from "redux";

import peopleReducer from "./starwars/people"
import planetReducer from "./starwars/planets"

const rootReducer = combineReducers({
    people: peopleReducer,
    planet: planetReducer
})

export default rootReducer