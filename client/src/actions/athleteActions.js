import axios from "axios";
import { GET_ATHLETES, UPDATE_ATHLETE, ADD_ATHLETE, SET_ATHLETE } from "./types";

export const getAthletes = () => async dispatch => {
    try {
        const athletes = await axios.get('/api/athlete')

        dispatch({
            type: GET_ATHLETES,
            payload: athletes.data
        })
    } catch (error) {
        console.error('error', error)
    }
    
}

export const setSportPlayer = (athlete) => async dispatch => {
    dispatch({
        type: SET_ATHLETE,
        payload: athlete
    })
}

export const createAthlete = (body) => async dispatch => {
    try {
        const newAthlete = await axios.post('/api/athlete', body)

        dispatch({
            type: ADD_ATHLETE,
            payload: newAthlete.data
        })
    } catch (error) {
        console.error('error', error)
    }
    
}

export const updateAthelete = (id, body) => async dispatch => {
    try {
        const updatedAthlete = await axios.put(`/api/athlete/${id}`, body)

        dispatch({
            type: UPDATE_ATHLETE,
            payload: updatedAthlete.data
        })
    } catch (error) {
        console.error('error', error)
    }
    
}

export const uploadImage = (id, image) => async dispatch => {
    try {
        const formData = new FormData()
        formData.append('image', image)
        const uploadImage = await axios.post(`/api/athlete/image/${id}`, formData)

        dispatch({
            type: UPDATE_ATHLETE,
            payload: uploadImage.data
        })
    } catch (error) {
        console.error('error', error)
    }
}