import { all } from 'redux-saga/effects'
import { starWarsSagas } from "./starwars"

export default function* rootSagas() {
    yield all({
        ...starWarsSagas
    })
}