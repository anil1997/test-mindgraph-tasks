import React from "react"
import { CALL_ATTEMPT, CALL_SUCCESSFUL, CALL_FAILED } from "../config"

const initialState = {
    data: {},
    pokemonList: [],
    pokemonDetails: {},
    isLoading: false,
    error: false
}

const callReducer = (state = initialState, action) => {

    switch (action.type) {
        case CALL_ATTEMPT:
            return {
                ...state,
                isLoading: true,
            }
        case CALL_SUCCESSFUL:
            return {
                ...state,
                data: action.data,
                pokemonList: action.status === 'list' ? [...state.pokemonList, ...action.data.results] : state.pokemonList,
                pokemonDetails: action.status !== 'list' ? action.data : state.pokemonDetails,
                isLoading: false,
            }
        case CALL_FAILED:
            return {
                ...state,
                isLoading: false,
                error: true,
            }
        default:
            return state
    }
} 

export default callReducer;