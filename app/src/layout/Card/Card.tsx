import React from 'react';

interface ICardProps {
    title?: string;
}

const Card : React.FC<ICardProps> = props => {

    return (

        <article>
            <h3>{props.title}</h3>
        </article>

    )

}

export default Card;