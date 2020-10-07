import React from 'react';
import { routes, IRoute } from './routes';
import { Route, Switch, Redirect } from 'react-router-dom';
import LoginContainer from '../container/LoginContainer';
import { IUserState } from '../shared/user/slices/userSlices';
import { useSelector } from 'react-redux';
import { RootState } from '../core/rootReducer';
import { IUser } from '../shared/user/model/IUser';

const Router : React.FC<{}> = props => {

    const user : IUserState = useSelector(
        ( state : RootState) => state.userState
    )

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