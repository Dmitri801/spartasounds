import React, { Component } from "react";
import Card from "./Card";
class CardBlockShop extends Component {
  renderCards = () => {
    return this.props.list ? this.props.list.map(card => 
    <Card 
     key={card._id}
     {...card}
     grid={this.props.grid}
    />) : null;
  };

  render() {
    const { list } = this.props;
    return (
      <div className="card_block_shop">
        <div className="container">
          <div style={{
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
            flexWrap: "wrap"
          }}>
            {list ? (
              list.length === 0 ? (
                <div>No Results Found</div>
              ) : null
            ) : null}
            {this.renderCards(list)}
          </div>
        </div>
      </div>
    );
  }
}

export default CardBlockShop;
