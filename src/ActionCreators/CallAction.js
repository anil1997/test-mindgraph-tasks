import { CALL_ATTEMPT, CALL_SUCCESSFUL, CALL_FAILED } from '../config'
import { CALL_API } from '../apibase/networkCall';

export const loadingStart  = () => {
    return {
        type: CALL_ATTEMPT,
    }
}

export const dataFetched = (data, status) => {
    console
    return {
        type: CALL_SUCCESSFUL,
        data: data,
        status: status
    }
}

export const loadingFailed = () => {
    return {
        type: CALL_FAILED,
    }
}

export const callAPI = (url, status) => {
    return async (dispatch) => {

        dispatch(loadingStart())
        CALL_API(url).then((res) => {
            if(res.status == 200){
                dispatch(dataFetched(res?.data, status))
            } else {
                dispatch(loadingFailed())
            }
        }).catch((err) => {
            dispatch(loadingFailed())
        })
    } 
}