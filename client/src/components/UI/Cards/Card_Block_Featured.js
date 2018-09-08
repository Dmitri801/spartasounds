import React from 'react';
import Card from './Card';

const CardBlockFeatured = (props) => {

    const renderCards = () => {
       return (
        props.list ? (
            props.list.map((card, index) => (
                <div key={index}>
                    <Card 
                     isAuth={props.isAuth}
                     {...card}
                    />
                </div>
            ))
        ) : null
       ) 
    }
    
  return (
    <div className="card_block_featured">
        <div className="container">
          {
              props.title ? (
                <div className="title">
                    {props.title}
                </div>
              ) : null
          }
          <div
             style={{
              display: 'flex',
              justifyContent: 'space-evenly',
              flexWrap: 'wrap'
          }} >
            {renderCards(props.list)}
          </div>
        </div>
    </div>
  )
}

export default CardBlockFeatured;
