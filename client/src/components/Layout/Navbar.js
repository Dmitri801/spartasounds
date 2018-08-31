import React, {Component} from 'react';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import { TheLogo } from "../UI/Icon";
import { Transition } from "react-spring";

class Navbar extends Component {
  state = {
    scrollTop: true
  };
  componentDidMount() {
    window.addEventListener("scroll", this.onPageScroll);
  }

  onPageScroll = () => {
    if (window.scrollY > 0) {
      this.setState({
        scrollTop: false
      });
    } else {
      this.setState({
        scrollTop: true
      });
    }
  };
  render() {
    const { scrollTop } = this.state;
    return (
      <AppBar
        position="fixed"
        style={{
          backgroundColor: this.state.scrollTop
            ? "rgb(17, 17, 17)"
            : "rgba(17, 17, 17, 0.8)",
          padding: this.state.scrollTop ? "10px 0px" : "0px 0px",
          borderBottom: "2px solid #ca3726",
          transition: "all 0.5s ease-out"
        }}
      >
        <Toolbar className="nav" style={{ display: "flex" }}>
          <div style={{ flexGrow: 1 }}>
            <div className="header_logo">
              <TheLogo link={true} linkTo="/" width="100px" height="70px" />
              
                <div>
                  <span className="header_text">Sparta Sounds</span>
                </div>
             
              {scrollTop ? (
                <Transition
                  from={{ opacity: 0 }}
                  enter={{ opacity: 1 }}
                  leave={{ opacity: 0 }}
                >
                  {styles => (
                    <span style={styles} className="header_second">
                      Colosseum of samples for producers
                    </span>
                  )}
                </Transition>
              ) : null}
            </div>
          </div>

          <Button className="nav_link" color="inherit">
            Free Sounds
          </Button>

          <Button className="nav_link" color="inherit">
            Loops
          </Button>

          <Button className="nav_link" color="inherit">
            Drum Kits
          </Button>

          <Button className="nav_link" color="inherit">
            Beats
          </Button>
        </Toolbar>
      </AppBar>
    );
  }
}

export default Navbar;
