import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface AuthPageState {
    id:number;
    username:string;
    first_name:string;
    last_name:string;
    token:string;
    role:string;
    authenticated:boolean;
    pageIsLoading: boolean;
    error: string;
}

const initialState: AuthPageState = {

    id:0,
    username:"",
    first_name:"",
    last_name:"",
    token:"",
    role:"anonymous",
    authenticated:false,
    pageIsLoading: false,
    error: "Неверный логин или пароль"
}

export const authPageSlice = createSlice({
    name: 'authPage',
    initialState,
    reducers: {
        isAuthenticated(state, action: PayloadAction<boolean>){
            state.authenticated = action.payload
        },
        isUsername(state, action: PayloadAction<string>){
            state.username = action.payload
        },
        isFirst_name(state, action: PayloadAction<string>){
            state.first_name = action.payload
        },
        isToken(state, action: PayloadAction<string>){
            state.token = action.payload
        },
        isRole(state, action: PayloadAction<string>){
            state.role = action.payload
        },
        isError(state, action: PayloadAction<string>){
            state.role = action.payload
        },
        resetAuth(state) {
            state.role = initialState.role;
        },

    }
})

export default authPageSlice.reducer;