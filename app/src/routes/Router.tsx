import React, { useEffect } from 'react';
import { routes, IRoute } from './routes';
import { Route, Switch, Redirect } from 'react-router-dom';
import LoginContainer from '../container/LoginContainer';
import { IUserState, loginSuccesfully } from '../shared/user/slices/userSlices';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../core/rootReducer';
import { IUser } from '../shared/user/model/IUser';

const Router : React.FC<{}> = props => {

    const user : IUserState = useSelector(
        ( state : RootState) => state.userState
    )

    const dispatch = useDispatch();

    useEffect(() => {
  
      const token     = localStorage.getItem('token');
      const username  = localStorage.getItem('username');
  
      if(!token || !username) return;
  
      try{
  
        dispatch(loginSuccesfully({username: username, token: JSON.parse(token)}));
  
      }
      catch(e) { }
  
    }, [])

    return (

        <Switch>



            {
                user.user 
                    ? <PrivateRoute user={user.user} />
                    : <>
                        <Route exact path="/login" component={ LoginContainer } />
                        <Redirect to='/login' />
                    </>
            }

        </Switch>

    )

}

const PrivateRoute : React.FC<{user : IUser}> = props => {

    const renderRoute = ( route : IRoute, index : number ) => <Route key={index} path={route.path} component={route.component} />

    return (

        <>
            {routes.map(renderRoute)}

            <Redirect to='/home' />

        </>

    )

}

export default Router;