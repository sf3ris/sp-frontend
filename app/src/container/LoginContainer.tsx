import React from 'react';
import LoginComponent from '../component/login/login.component';
import { useDispatch } from 'react-redux';
import { loginSuccesfully } from '../shared/user/slices/userSlices';

const LoginContainer : React.FC<{}> = props => {

    const dispatch = useDispatch();

    const onLogin = ( username : string ) => {

        dispatch(loginSuccesfully({username}));

    }

    return (
        
        <LoginComponent 
            onLogin={onLogin}/>

    )

}

export default LoginContainer;