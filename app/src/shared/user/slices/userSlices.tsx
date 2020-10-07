import { IUser } from "../model/IUser";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IUserState {
    user : IUser | null;
}

const initialUserState : IUserState = {
    user: null
}

const userSlice = createSlice({
    name: 'user',
    initialState: initialUserState,
    reducers: {

        loginSuccesfully( state : IUserState, action : PayloadAction<IUser> ) {
            state.user = action.payload;
        },

        logout( state : IUserState, action: PayloadAction<null>) {
            state.user = null;
        }
 
    }
})

export const { loginSuccesfully, logout } = userSlice.actions;

export default userSlice.reducer;