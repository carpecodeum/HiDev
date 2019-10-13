import {GET_PROFILE,PROFILE_LOADING,CLEAR_CURRENT_PROFILE,PROFILE_ERRORS} from '../actions/types'


const initialstate ={
    profile:{},
    profiles:null,
    loading:false,
}

export default function(state = initialstate,action){
    switch(action.type){
        case PROFILE_LOADING:
        return{
            ...state,
            loading:true,
        }
        case GET_PROFILE:
        return{
            ...state,
            profile:action.payload,
            loading:false
        }
        case CLEAR_CURRENT_PROFILE:
        return{
            ...state,
            profile:null
        }
        case PROFILE_ERRORS:
        return{
            ...state,
            profile:action.payload,
            loading:false
        }
        default:
        return state
    }
}