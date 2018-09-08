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
         isAuth={this.props.users.authedUser.isAuth}
        />
        <HomeSignup />
        <CardBlockFeatured 
         title="New Arrivals"
         list={this.props.products.byArrival}
         isAuth={this.props.users.authedUser.isAuth}
        />
      </div>
    );
  }
}

const mapStateToProps = ({ products, users }) => ({
  users,
  products
});

export default connect(mapStateToProps)(HomeContent);
