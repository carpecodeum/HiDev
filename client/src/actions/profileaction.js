import axios from 'axios'

import {GET_PROFILE,PROFILE_LOADING, CLEAR_CURRENT_PROFILE, PROFILE_ERRORS} from './types';

export const getcurrentprofile = () =>
    dispatch =>{
        dispatch(setProfileLoading());
        axios.get('/api/profile').then(res=>
            dispatch({
                type:GET_PROFILE,
                payload:res.data
            })).catch(
                err=> dispatch({
                    type:PROFILE_ERRORS,
                    payload:{}
                })
            )
    }

export const setProfileLoading = ()=>{
    return {
        type: PROFILE_LOADING
    }
}
export const clearcurrentprofile = ()=>{
    return {
        type: CLEAR_CURRENT_PROFILE
    }
}