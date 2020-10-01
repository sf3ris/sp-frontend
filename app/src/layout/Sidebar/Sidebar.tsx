import React, { useState } from 'react'
import Logo from './Logo/Logo';
import { IRoute, routes } from '../../routes/routes';
import MenuEntry from  './Menu/MenuEntry';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronCircleLeft, faChevronCircleRight } from '@fortawesome/free-solid-svg-icons';


const Sidebar : React.FC<{}> = props => {

    const [ collapsed, setCollapsed ] = useState<boolean>(false);

    const renderRoute = ( route : IRoute ) => !route.hideFromMenu && <MenuEntry collapsed={collapsed} route={route} key={route.name} />

    const onCollapse = () => {

        document.body.classList.toggle('collapsed');

        setCollapsed(!collapsed);

    }

    return (
        

        <div className="page-header">

            <Logo collapsed={collapsed} />
            
            <nav>
                <ul className="admin-menu">

                    {routes.map(renderRoute)}

                    <li>
                        <button onClick={onCollapse} aria-expanded="true" aria-label="collapse menu">
                            <span> <FontAwesomeIcon icon={collapsed ? faChevronCircleRight : faChevronCircleLeft} /> Collapse</span>
                        </button>
                    </li>

                </ul>
            </nav>

            


        </div>

    )

}

export default Sidebar;