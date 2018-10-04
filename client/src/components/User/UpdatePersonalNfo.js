import React, { Component } from "react";
import FormField from "../UI/Forms/FormField";
import {
  update,
  isFormValid,
  generateData,
  populateFields
} from "../utils/formActions";
import { updateUserProfile } from "../../store/actions/userActions";
import { toastr } from "react-redux-toastr";
import Button from "@material-ui/core/Button";
import Spinner from "../UI/Spinner";
import { connect } from "react-redux";
const userDashboardBackground = require("../../resources/Images/user-dashboard-background.jpeg");
class UpdatePersonalNfo extends Component {
  state = {
    loading: false,
    formError: false,
    formSuccess: false,
    formData: {
      firstName: {
        element: "input",
        value: "",
        config: {
          name: "firstNameInput",
          type: "text",
          placeholder: "Enter Your First Name"
        },
        validation: {
          required: false
        },
        valid: true,
        touched: false,
        validationMessage: ""
      },
      lastName: {
        element: "input",
        value: "",
        config: {
          name: "lastNameInput",
          type: "text",
          placeholder: "Enter Your Last Name"
        },
        validation: {
          required: false
        },
        valid: true,
        touched: false,
        validationMessage: ""
      },
      email: {
        element: "input",
        value: "",
        config: {
          name: "emailInput",
          type: "email",
          placeholder: "jane@janedoe.com"
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

  componentDidMount() {
    const newFormData = populateFields(
      this.state.formData,
      this.props.authedUser
    );

    this.setState({
      formData: newFormData
    });
  }

  updateForm = element => {
    const newFormData = update(element, this.state.formData, "update_user");
    this.setState({
      formError: false,
      formData: newFormData
    });
  };

  submitForm = e => {
    e.preventDefault();

    this.setState({
      loading: true
    });

    let formIsValid = isFormValid(this.state.formData, "update_user");
    let dataToSubmit = generateData(this.state.formData, "update_user");
    if (formIsValid) {
      this.props.dispatch(updateUserProfile(dataToSubmit)).then(res => {
        this.setState({ loading: false }, () => {
          this.props.route.push("/user/dashboard");

          toastr.success("Updated Successfully");
        });
      });
    } else {
      setTimeout(() => {
        this.setState({
          formError: true,
          loading: false
        });
      }, 500);
    }
  };

  onEnterSubmit = event => {
    if (event.keyCode === 13) {
      document.querySelectorAll(".register_inputs")[5].blur();
      document.querySelectorAll(".register_inputs")[7].blur();
      document.querySelectorAll(".register_inputs")[9].blur();
      setTimeout(() => {
        this.submitForm(event);
      }, 30);
    }
  };

  render() {
    console.log(this.props);
    return (
      <div>
        <div
          style={{
            background: `url(${userDashboardBackground})`,
            backgroundAttachment: "fixed",
            position: "absolute",
            backgroundSize: "cover",
            height: "1000px",
            width: "100%",
            zIndex: "1",
            top: "0",
            opacity: "0.08"
          }}
        />
        <div className="form_container_updateprof">
          <div className="form_card_updateprof">
            <h2>Update Your Profile</h2>
            <form
              onKeyDown={event => this.onEnterSubmit(event)}
              onSubmit={event => this.submitForm(event)}
            >
              <div className="form_group">
                <div className="updateProfile_label">
                  <label style={{ marginRight: "0px" }} htmlFor="firstName">
                    FIRST NAME
                  </label>
                </div>
                <FormField
                  id={"firstName"}
                  location="updateProfile"
                  formData={this.state.formData.firstName}
                  change={element => this.updateForm(element)}
                />
              </div>
              <div className="form_group">
                <div className="updateProfile_label">
                  <label style={{ marginRight: "0px" }} htmlFor="lastName">
                    LAST NAME
                  </label>
                </div>
                <FormField
                  id={"lastName"}
                  location="updateProfile"
                  formData={this.state.formData.lastName}
                  change={element => this.updateForm(element)}
                />
              </div>
              <div className="form_group">
                <div className="updateProfile_label">
                  <label style={{ marginRight: "35px" }} htmlFor="email">
                    EMAIL
                  </label>
                </div>
                <FormField
                  id={"email"}
                  location="updateProfile"
                  formData={this.state.formData.email}
                  change={element => this.updateForm(element)}
                />
              </div>
              <div className="bottom_updateprof_container">
                <Button
                  onClick={event => this.submitForm(event)}
                  variant="outlined"
                  disabled={this.state.loading}
                  style={
                    this.state.loading
                      ? { borderColor: "grey", opacity: "0.4" }
                      : null
                  }
                  className="updateprof_user_btn"
                >
                  Update
                </Button>
                {this.state.loading && (
                  <Spinner specialClassName="register_spinner" />
                )}
              </div>
              {this.state.formError ? (
                <div className="error_label_bottom">
                  <p>{this.renderError()}</p>
                </div>
              ) : null}
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ users }) => ({
  authedUser: users.authedUser
});

export default connect(mapStateToProps)(UpdatePersonalNfo);
