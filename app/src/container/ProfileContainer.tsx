import React from 'react';
import Card from '../layout/Card/Card';
import DefaultLayout from '../layout/DefaultLayout';

const ProfileContainer : React.FC<{}> = props => {

    return (

        <DefaultLayout>
            <section className="grid">

                <Card title="Profile" />

                <Card title="Personal Information"/>
                <Card title="Contribution"/>

                <Card title="Statistics"/>

            </section>
        </DefaultLayout>

    )

}

export default ProfileContainer;