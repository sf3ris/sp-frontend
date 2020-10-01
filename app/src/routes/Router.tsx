import React from 'react';
import { routes, IRoute } from './routes';
import { Route, Switch, Redirect } from 'react-router-dom';
import ProfileContainer from '../container/ProfileContainer';

const Router : React.FC<{}> = props => {

    const renderRoute = ( route : IRoute, index : number ) => <Route key={index} path={route.path} component={route.component} />

    return (

        <Switch>

            {routes.map(renderRoute)}

            <Route path="/profile" exact component={ProfileContainer} />
            <Redirect to='/home' />

        </Switch>

    )

}

export default Router;