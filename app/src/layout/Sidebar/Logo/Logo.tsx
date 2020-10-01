import React from 'react';
import style from './logo.module.css';
import  logo from './logo.svg';

interface ILogoProps {
    collapsed : boolean
}

const Logo : React.FC<ILogoProps> = props => {

    return (

        props.collapsed 
            ? null : 
            <div className={style.logo}>
                <img alt="AppLogo" src={logo} />
            </div>

    )

}

export default Logo;