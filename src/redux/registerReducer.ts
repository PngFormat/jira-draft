import { IRegisterState,IAction } from "../interfaces";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState : IRegisterState  =  {
    loading: false,
    userInfo: null ,
    error: null
}

const registerSlice = createSlice({
    name: 'register',
    initialState,
    reducers: {
        registerReguest: (state) => {
            state.loading = true;
            state.error = '';
        },
        registerSuccess : (state,action: PayloadAction<any>) =>{
            state.loading = false;
            state.userInfo = action.payload;
            state.error = '';
        },
        registerFailure: (state,action: PayloadAction<any>) => {
            state.loading = false;
            state.error = action.payload
        }
    }

})

export const {registerReguest,registerSuccess,registerFailure} = registerSlice.actions

export default registerSlice.reducer;

// export const registerReducer = (state = initialState,action: IAction):IRegisterState => {
//     switch (action.type){
//         case REGISTER_REQUEST:
//             return {...state, loading: true,error: null}

//         case REGISTER_SUCCESS:
//             return {...state,userInfo: action.payload, loading: false,error: null}

//         case REGISTER_FAILURE:
//             return {...state, loading: false,error: action.payload}

//         default: 
//             return state;
//     }
// }



