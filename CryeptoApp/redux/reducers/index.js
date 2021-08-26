import {combineReducers} from 'redux'
import {markerReducer} from './marketReducer'
import {markerSummeryReducer} from './marketSummery'

export const reducers = combineReducers({
    markerReducer,
    markerSummeryReducer
});

