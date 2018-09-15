import React, { Component } from "react";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import faAngleDown from "@fortawesome/fontawesome-free-solid/faAngleDown";
import faAngleUp from "@fortawesome/fontawesome-free-solid/faAngleUp";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { withStyles } from "@material-ui/core/styles";
import Collapse from "@material-ui/core/Collapse";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";

const customFormStyles = theme => ({
  root: {
    padding: "10px"
  },
  label: {
    color: "#fff"
  }
});

const customRadioStyles = theme => ({
  root: {
    color: "#fff",
  },

});

const CustomFormControlLabel = withStyles(customFormStyles)(FormControlLabel);
const CustomRadio = withStyles(customRadioStyles)(Radio);
class CollapseRadio extends Component {
  state = {
    open: false,
    value: "0"
  };
  componentDidMount() {
    if (this.props.initState) {
      this.setState({
        open: this.props.initState
      });
    }
  }

  handleClick = () => {
    this.setState(prevState => ({
      open: !prevState.open
    }));
  };

  handleDropdownAngle = () => {
    return this.state.open ? (
      <FontAwesomeIcon icon={faAngleUp} className="icon" />
    ) : (
      <FontAwesomeIcon icon={faAngleDown} className="icon" />
    );
  };

  renderList = () =>
    this.props.list
      ? this.props.list.map(value => (
          <CustomFormControlLabel
            key={value._id}
            value={`${value._id}`}
            control={<CustomRadio color="primary" />}
            label={`${value.name}`}
          />
        ))
      : null;

  handleChange = event => {
    this.props.handleFilters(event.target.value);
    this.setState({
      value: event.target.value
    });
  };
  render() {
    return (
      <div>
        <List className="collapse_list">
          <ListItem
            style={{ padding: "10px 23px 10px 0" }}
            onClick={this.handleClick}
          >
            <ListItemText
              primaryTypographyProps={{
                style: {
                  color: "#fff",
                  fontWeight: 800
                }
              }}
              primary={this.props.title}
              className="collapse_title"
            />
            {this.handleDropdownAngle()}
          </ListItem>
          <Collapse timeout="auto" unmountOnExit in={this.state.open}>
            <List disablePadding component="div">
              <RadioGroup
                aria-label="prices"
                name="prices"
                value={this.state.value}
                onChange={this.handleChange}
              >
                {this.renderList()}
              </RadioGroup>
            </List>
          </Collapse>
        </List>
      </div>
    );
  }
}

export default CollapseRadio;
