import React from 'react';
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { faBookmark, faCalendar,faUser } from '@fortawesome/free-regular-svg-icons';
import { faHome, faCog, faUsersCog, faUserSecret, faUserShield, faSkating } from '@fortawesome/free-solid-svg-icons';
import HomeContainer from '../container/HomeContainer';
import ProfileContainer from '../container/ProfileContainer';
import MemberContainer from '../container/MemberContainer';
import CalendarContainer from '../container/CalendarContainer';
import SettingsContainer from '../container/SettingsContainer';
import AthleteContainer from '../container/AthleteContainer';

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
        name: 'Members',
        path: '/members',
        icon: faUserShield,
        component: MemberContainer
    },
    {
        name: 'Athletes',
        path: '/athletes',
        icon: faSkating,
        component: AthleteContainer
    },
    {
        name: 'Calendar',
        path: '/calendar',
        component: CalendarContainer,
        icon: faCalendar
    },
    {
        name: 'Settings',
        path: '/settings',
        component: SettingsContainer,
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