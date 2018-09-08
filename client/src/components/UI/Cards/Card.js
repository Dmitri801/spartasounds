import React, { Component } from 'react'
const imageComingSoon = require('../../../resources/Images/Image_Coming_Soon.jpg');
class Card extends Component {

    renderCardImage = (images) => {
        if(images.length > 0) {
            return images[0].url
        } else {
            return imageComingSoon;
        }
    }
  render() {
      const props = this.props;
    return (
      <div className={`card_item_wrapper ${props.grid}`}>
        <div
        className="image"
        style={{
            background: `url(${this.renderCardImage(props.images)}) no-repeat`
        }}
        >
        </div>
        <div className="action_container">
             <div className="tags">
              <div className="name">
               {props.name}
              </div>
               <div className="genre">
                {props.genre.name}
               </div>
                <hr />
             </div>
            </div>
      </div>
    )
  }
}



export default Card
