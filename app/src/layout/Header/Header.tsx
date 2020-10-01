import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-regular-svg-icons';
import { useHistory } from 'react-router-dom';


const Header : React.FC<{}> = props => {

    const history = useHistory();

    const onUserClick = () => {

        history.push( '/profile');

    }

    return (

        <section className="search-and-user">
            <form>
                <input type="search" value="Page Title" disabled></input>
            </form>
            <div className="admin-profile">

                <span className="greeting">Administrator</span>
                <div onClick={onUserClick} className="notifications">
                    <span className="badge">1</span>
                    <FontAwesomeIcon icon={faUserCircle} />
                </div>

            </div>
        </section>

    )

}

export default Header;