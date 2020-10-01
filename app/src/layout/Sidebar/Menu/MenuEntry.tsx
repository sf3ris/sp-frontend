import React from 'react';
import { IRoute } from '../../../routes/routes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

interface IMenuEntryProps {
    route : IRoute;
    collapsed : boolean;
}

const MenuEntry : React.FC<IMenuEntryProps> = props => {
 
    return (

        
        <li>
            <Link to={props.route.path}> 
                <FontAwesomeIcon icon={props.route.icon}/> {props.collapsed ? null : <span>{props.route.name}</span> }
            </Link>
        </li>

    )

}

export default MenuEntry;