import { CALL_ATTEMPT, CALL_SUCCESSFUL, CALL_FAILED } from "../config"

const initialState = {
    data: {},
    isLoading: false,
    error: false,
    noInternet: false
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
                isLoading: false,
                loggedIn: true
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