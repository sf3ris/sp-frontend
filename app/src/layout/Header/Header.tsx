import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-regular-svg-icons';
import { useHistory } from 'react-router-dom';
import { faArrowRight, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { logout } from '../../shared/user/slices/userSlices';


const Header : React.FC<{}> = props => {

    const history = useHistory();

    const dispatch = useDispatch();

    const onUserClick = () => {

        history.push( '/profile');

    }

    const onLogout = () => {

        dispatch( logout(null) );

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

                <div onClick={onUserClick} style={{marginLeft:'2vw'}}>
                    <FontAwesomeIcon onClick={onLogout} icon={faSignOutAlt} />
                </div>

            </div>
        </section>

    )

}

export default Header;