import { IUser } from "../model/IUser";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "../../../core/store";
import { authService } from "../services/auth.service";

export interface IUserState {
    user : IUser | null;
    logging: boolean;
    error: boolean;
}

const initialUserState : IUserState = {
    user: null,
    logging: false,
    error: false
}

const userSlice = createSlice({
    name: 'user',
    initialState: initialUserState,
    reducers: {

        loginSuccesfully( state : IUserState, action : PayloadAction<IUser> ) {

            localStorage.setItem('token',JSON.stringify(action.payload.token));
            localStorage.setItem('username', action.payload.username);

            state.user      = action.payload;
            state.error     = false;
            state.logging   = false;  
        },

        logout( state : IUserState, action: PayloadAction<null>) {
            state.user = null;
            localStorage.removeItem('token');
            localStorage.removeItem('username');
        },

        loggingIn( state : IUserState, action: PayloadAction<boolean> ) {

            state.error = false;
            state.logging = action.payload;

        },

        loginFailed( state : IUserState, action: PayloadAction<null>) {

            state = {
                ...initialUserState,
                error: true
            };

        }
 
    }
})

export const { loginSuccesfully, logout, loggingIn, loginFailed } = userSlice.actions;

export default userSlice.reducer;

export const login = ( username : string, password : string) : AppThunk => async dispatch => {

    try{

        dispatch(loggingIn(true));

        const response = await authService.login(
            username, 
            password
        );

        dispatch( loginSuccesfully({username, token: response}));
        
    }
    catch( e ) {

        dispatch(loginFailed(null));

    }

}