import React from 'react';
import './Card.css';

const Card = (props) =>{
    return (
        <div className='CardDiv' >{props.children}</div>
    )
}

export default Card;