import React, { Component } from "react";
import axios from "axios";
import FileSaver from "file-saver";
import { Link } from "react-router-dom";
import FormField from "../../UI/Forms/FormField";
import { update } from "../../utils/formActions";
import { easePolyOut } from "d3-ease";
import Animate from "react-move/Animate";
import FeaturedKit from "../../../resources/Images/LandingBox-medium-min.png";
import Button from "@material-ui/core/Button";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";
import Modal from "../../UI/Modal";
import faSmile from "@fortawesome/fontawesome-free-solid/faSmile";
import { getSamplePack } from "../../../store/actions/testActions";
import {
  openSampleModal,
  closeSampleModal
} from "../../../store/actions/modalActions";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import FlatBtn from "../../UI/Buttons/FlatBtn";
import { connect } from "react-redux";
class TextAndModal extends Component {
  state = {
    fileDownloading: false,
    formError: false,
    formSuccess: "",
    formData: {
      email: {
        element: "input",
        value: "",
        config: {
          name: "emailInput",
          type: "email",
          placeholder: "Enter Your Email For A Free Download Instantly"
        },
        validation: {
          required: true,
          email: true
        },
        valid: false,
        touched: false,
        validationMessage: ""
      }
    }
  };

  openSampleModal = () => {
    this.props.openSampleModal();
  };
  closeSampleModal = () => {
    this.props.closeSampleModal();
    this.setState({
      formError: false,
      formSuccess: "",
      formData: {
        email: {
          element: "input",
          value: "",
          config: {
            name: "emailInput",
            type: "email",
            placeholder: "Enter Your Email For A Free Pack"
          },
          validation: {
            required: true,
            email: true
          },
          valid: false,
          touched: false,
          validationMessage: ""
        }
      }
    });
  };

  updateForm = element => {
    const newFormData = update(element, this.state.formData, "Send Sample");
    this.setState({
      formError: false,
      formData: newFormData
    });
  };

  closeIcon = () => <div>{null}</div>;
  animateNumber = () => (
    <Animate
      show={true}
      start={{
        opacity: 0,
        rotate: 0
      }}
      enter={{
        opacity: [1],
        rotate: [360],
        timing: { duration: 1000, ease: easePolyOut }
      }}
    >
      {({ opacity, rotate }) => {
        return (
          <div
            style={{
              opacity,
              transform: `translate(260px, 170px) rotateY(${rotate}deg)`
            }}
            className="featured_number"
          >
            17
          </div>
        );
      }}
    </Animate>
  );

  animateFirst = () => (
    <Animate
      show={true}
      start={{
        opacity: 0,
        x: 503,
        y: 450
      }}
      enter={{
        opacity: [1],
        x: [273],
        y: [450],
        timing: { duration: 500, ease: easePolyOut }
      }}
    >
      {({ opacity, x, y }) => {
        return (
          <div
            style={{
              opacity,
              transform: `translate(${x}px, ${y}px)`
            }}
            className="featured_first"
          >
            Free
          </div>
        );
      }}
    </Animate>
  );

  animateSecond = () => (
    <Animate
      show={true}
      start={{
        opacity: 0,
        x: 503,
        y: 586
      }}
      enter={{
        opacity: [1],
        x: [273],
        y: [586],
        timing: { delay: 400, duration: 500, ease: easePolyOut }
      }}
    >
      {({ opacity, x, y }) => {
        return (
          <div
            style={{
              opacity,

              transform: `translate(${x}px, ${y}px)`
            }}
            className="featured_second"
          >
            Sounds
          </div>
        );
      }}
    </Animate>
  );

  animateKit = () => (
    <Animate
      show={true}
      start={{
        opacity: 0
      }}
      enter={{
        opacity: [1],

        timing: { delay: 800, duration: 500, ease: easePolyOut }
      }}
    >
      {({ opacity }) => {
        return (
          <div
            style={{
              opacity,
              background: `url(${FeaturedKit})`,
              transform: `translate(410px, 120px)`
            }}
            className="featured_kit"
          />
        );
      }}
    </Animate>
  );

  animateButton = () => (
    <Animate
      show={true}
      start={{
        opacity: 0
      }}
      enter={{
        opacity: [1],

        timing: { delay: 800, duration: 500, ease: easePolyOut }
      }}
    >
      {({ opacity }) => {
        return (
          <div
            style={{
              opacity,
              transform: `translate(550px, 520px)`
            }}
            className="featured_button"
          >
            <Button
              onClick={this.openSampleModal}
              style={{
                background: "#0e1d24",
                color: "#fff",
                padding: "10px 10px",
                width: "300px"
              }}
              className="landing_btn"
              size="large"
              variant="contained"
            >
              <CloudDownloadIcon style={{ margin: "0px 10px" }} />
              Get Download
            </Button>
          </div>
        );
      }}
    </Animate>
  );

  onDownloadSampleClick = () => {
    this.setState({ fileDownloading: true });
    axios({
      method: "GET",
      url: "/api/test/stream/90b7d1d5ed550882284dcf6f62774963.zip",
      responseType: "blob"
    })
      .then(response => {
        FileSaver.saveAs(response.data, "sparta_sample_pack.zip");
      })
      .then(() => {
        this.closeSampleModal();
        this.setState({ fileDownloading: false });
      });
  };

  render() {
    console.log(this.state.fileDownloading);
    const { sampleModalOpen } = this.props;
    return (
      <div className="featured_text">
        {this.animateKit()}
        {this.animateNumber()}
        {this.animateFirst()}
        {this.animateSecond()}
        {this.animateButton()}
        <Modal
          onBackDropClick={this.closeSampleModal}
          titleClassName="sample_modal_title"
          closeIcon={this.closeIcon}
          modalTitle="Sparta Sounds Promo"
          fullWidth={true}
          modalOpen={sampleModalOpen}
        >
          {!this.state.fileDownloading ? (
            <form style={{ width: "100%" }}>
              <div className="send_sample_form_wrapper">
                <FormField
                  change={element => this.updateForm(element)}
                  id={"email"}
                  location="home"
                  formData={this.state.formData.email}
                />
              </div>
              <FlatBtn
                width="100%"
                margin="0 10px"
                click={this.onDownloadSampleClick}
                title="Download"
                fontSize="1.7em"
              />
              <p
                style={{
                  marginTop: "60px",
                  marginBottom: "0px"
                }}
              >
                Download A Variety of Free Kits When You Become A Member
              </p>
              <div className="sample_headline">
                <Link to="/register">
                  <span>Register Now</span>
                </Link>
              </div>
            </form>
          ) : (
            <div className="download_confirm_container_modal">
              <h1>Your Download Should Start Shortly...</h1>
              <FontAwesomeIcon icon={faSmile} />
            </div>
          )}
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = ({ modals }) => ({
  sampleModalOpen: modals.sampleModalOpen
});

export default connect(
  mapStateToProps,
  { getSamplePack, openSampleModal, closeSampleModal }
)(TextAndModal);
