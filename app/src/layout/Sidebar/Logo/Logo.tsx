import React from 'react';
import style from './logo.module.css';
import  logo from './logo.svg';
import rotellistica_juvenilia_pollenza_logo from './rotellistica_juvenilia_pollenza.jpg';

interface ILogoProps {
    collapsed : boolean
}

const Logo : React.FC<ILogoProps> = props => {

    return (

        props.collapsed 
            ? null : 
            <div className={style.logo}>
                <img alt="AppLogo" src={rotellistica_juvenilia_pollenza_logo} width="100%" height="100%" />
            </div>

    )

}

export default Logo;