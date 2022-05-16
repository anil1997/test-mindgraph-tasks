import { CALL_ATTEMPT, CALL_SUCCESSFUL, CALL_FAILED } from '../config'
import { CALL_API } from '../apibase/NetworkCall';

export const loadingIn = () => {
    return {
        type:CALL_ATTEMPT,
    }
}

export const loadedIn = () => {
    return {
        type: CALL_SUCCESSFUL,
    }
}

export const loadingFailed = () => {
    return {
        type: CALL_FAILED,
    }
}

export const callAPI = (url) => {
    return async (dispatch) => {
        dispatch(loadingIn())

        CALL_API(url).then((res) => {
            if(res.status == 200){
                dispatch(loadedIn())
            }else{
                dispatch(loadingFailed())
            }
        }).catch((err) => {
            dispatch(loadingFailed())
        })
    } 
}