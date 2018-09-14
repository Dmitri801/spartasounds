import React, { Component } from "react";
import Featured from "./Featured";
import HomeContent from "./HomeContent";
import {
  getProductsBySold,
  getProductsByArrival
} from "../../store/actions/productActions";
import { getAllAudio } from '../../store/actions/audioTrackActions';
import { connect } from "react-redux";
const backgroundImage = require("../../resources/Images/sparta-home-background.jpeg");

class Home extends Component {
  componentDidMount() {
    this.props.getProductsBySold();
    this.props.getProductsByArrival();
    this.props.getAllAudio();
  }
  render() {
    return (
      <div className="bck_dark">
        <div
          style={{
            background: `url(${backgroundImage})`,
            backgroundAttachment: "fixed",
            position: "absolute",
            height: "100%",
            width: "100%",
            opacity: "0.2"
          }}
          className="bck_overlay"
        />
        <Featured />
        <HomeContent />
      </div>
    );
  }
}

const mapStateToProps = ({ products }) => ({
  products
});

export default connect(
  mapStateToProps,
  { getProductsBySold, getProductsByArrival, getAllAudio }
)(Home);
