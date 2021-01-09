import { combineReducers } from 'redux'
import athleteReducer from './athleteReducer'

export default combineReducers({
    athletes: athleteReducer
})