import { userInfo } from "os";
import { REGISTER_REQUEST,REGISTER_FAILURE,REGISTER_SUCCESS } from "./registerActions";

interface RegisterState {
    loading: boolean,
    userInfo: any | null,
    error: string | null
}

interface Action {
    type: string;
    payload?: any;
}

const initialState : RegisterState  =  {
    loading: false,
    userInfo: null ,
    error: null
}

export const registerReducer = (state = initialState,action: Action):RegisterState => {
    switch (action.type){
        case REGISTER_REQUEST:
            return {...state, loading: true,error: null}

        case REGISTER_SUCCESS:
            return {...state,userInfo: action.payload, loading: false,error: null}

        case REGISTER_FAILURE:
            return {...state, loading: false,error: action.payload}

        default: 
            return state;
    }
}

export default registerReducer

