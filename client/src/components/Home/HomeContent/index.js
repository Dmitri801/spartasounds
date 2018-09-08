import React, { Component } from "react";
import HomeSignup from "./HomeSignup";
import { connect } from "react-redux";
import CardBlockFeatured from "../../UI/Cards/Card_Block_Featured";
class HomeContent extends Component {
  render() {
    return (
      <div>
        <CardBlockFeatured 
         title="Best Selling Kits"
         list={this.props.products.bySold}
        />
        <HomeSignup />
        <CardBlockFeatured 
         title="New Arrivals"
         list={this.props.products.byArrival}
        />
      </div>
    );
  }
}

const mapStateToProps = ({ products }) => ({
  products
});

export default connect(mapStateToProps)(HomeContent);
