import React from 'react';
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { faBookmark, faCalendar,faUser } from '@fortawesome/free-regular-svg-icons';
import { faHome, faCog } from '@fortawesome/free-solid-svg-icons';
import HomeContainer from '../container/HomeContainer';
import ProfileContainer from '../container/ProfileContainer';

export interface IRoute {
    name : string;
    path : string;
    component? : React.FC;
    icon : IconProp;
    hideFromMenu? : boolean;
}

export const routes : IRoute[] = [
    {
        name: 'Home',
        path: '/home',
        icon : faHome,
        component: HomeContainer
    },
    {
        name: 'Bookmars',
        path: '/bookmarks',
        icon: faBookmark,
    },
    {
        name: 'Calendar',
        path: '/calendar',
        icon: faCalendar
    },
    {
        name: 'Settings',
        path: '/settings',
        icon: faCog
    },
    {
        name: 'Profile',
        path: '/profile',
        icon: faUser,
        hideFromMenu: true,
        component: ProfileContainer
    }
]