import React, { Component } from "react";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import faAngleDown from "@fortawesome/fontawesome-free-solid/faAngleDown";
import faAngleUp from "@fortawesome/fontawesome-free-solid/faAngleUp";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import Collapse from "@material-ui/core/Collapse";
class CollapseCheckbox extends Component {
  state = {
    open: false,
    checked: []
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

  renderList = () => {
    return this.props.list
      ? this.props.list.map(item => {
          return (
            <ListItem key={item._id}>
              <ListItemText
                primaryTypographyProps={{
                  style: {
                    color: "#fff"
                  }
                }}
                primary={item.name}
              />
              <ListItemSecondaryAction>
                <Checkbox
                  color="primary"
                  onChange={() => this.handleToggle(item._id)}
                  checked={this.state.checked.indexOf(item._id) !== -1}
                />
              </ListItemSecondaryAction>
            </ListItem>
          );
        })
      : null;
  };

  handleToggle = value => {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if(currentIndex === -1) {
        newChecked.push(value);
    } else {
        newChecked.splice(currentIndex, 1);
    }
    
    this.setState({
        checked: newChecked
    })
  };

  render() {
    return (
      <div className="collapse_items_wrapper">
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
              {this.renderList()}
            </List>
          </Collapse>
        </List>
      </div>
    );
  }
}

export default CollapseCheckbox;
