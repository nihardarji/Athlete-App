import { ADD_ATHLETE, GET_ATHLETES, SET_ATHLETE, UPDATE_ATHLETE } from "../actions/types";

const initialState = {
    athletesList: [],
    athlete : null
}

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_ATHLETES:
            return {
                ...state,
                athletesList: action.payload
            }
        
        case SET_ATHLETE:
            return {
                ...state,
                athlete: action.payload
            }
        
        case ADD_ATHLETE:
            return {
                ...state,
                athletesList: [ action.payload, ...state.athletesList]
            }
        
        case UPDATE_ATHLETE:
            return {
                ...state,
                athletesList: state.athletesList.map(a => a._id === action.payload._id ? action.payload : a),
                athlete: action.payload
            }
        default:
            return state
    }
}