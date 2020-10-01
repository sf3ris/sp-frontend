import React from 'react';
import Card from '../layout/Card/Card';

const ProfileContainer : React.FC<{}> = props => {

    return (

        <section className="grid">

            <Card title="Profile" />

            <Card title="Personal Information"/>
            <Card title="Contribution"/>

            <Card title="Statistics"/>

        </section>

    )

}

export default ProfileContainer;