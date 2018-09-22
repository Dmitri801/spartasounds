import React from "react";
import Button from "@material-ui/core/Button";
const Footer = ({location}) => {
  const renderFooter = () => {
      return (
        <footer className="bck_ultra_dark">
        <div className="container">
          <div className="logo">
            <img
              height="200px"
              width="400px"
              src={require("../../resources/Images/Logo.png")}
              alt="logo"
            />
          </div>
          <div className="connect_wrapper">
            <div className="connect_header">
              <h2>Connect</h2>
            </div>
            <div className="connect_facebook_icon">
              <a href="https://facebook.com">
                <i className="fab fa-facebook-square" />
              </a>
            </div>
            <div className="connect_soundcloud_icon">
              <a href="https://soundcloud.com">
                <i className="fab fa-soundcloud" />
              </a>
            </div>
            <div className="connect_twitter_icon">
              <a href="https://soundcloud.com">
                <i className="fab fa-twitter" />
              </a>
            </div>
          </div>
          <div className="contact_wrapper">
            <Button
              className="contact_btn"
              fullWidth={true}
              size="large"
              variant="outlined"
              
              
            >
              Get In Touch
            </Button>
            <div className="copyright_wrapper">
            <p className="copyright">Copyright &copy;2018  - <a href="https://buildwithme-dmitriy.now.sh">DMI Web Design</a> - </p>
            </div>
          </div>
        </div>
      </footer>
      )
  }
  return (
    renderFooter()
  );
};

export default Footer;
