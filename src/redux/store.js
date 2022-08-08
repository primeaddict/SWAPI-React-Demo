import { applyMiddleware, compose, createStore } from "redux";
import { composeWithDevTools } from '@redux-devtools/extension';


import rootReducer from "./reducer";
import rootSagas from "./sagas"

import createSagaMiddleware from 'redux-saga'

const sagaMiddleware = createSagaMiddleware()
let middlewareArray = [sagaMiddleware];
const middleWareEnhancers = applyMiddleware(...middlewareArray);
const enhancers = [middleWareEnhancers];

const composedEnhancers = composeWithDevTools(...enhancers);


const store = createStore(rootReducer, composedEnhancers)

sagaMiddleware.run(rootSagas)

export default store