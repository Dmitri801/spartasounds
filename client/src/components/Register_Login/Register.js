import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import FormField from "../UI/Forms/FormField";
import Spinner from "../UI/Spinner";
import { toastr } from "react-redux-toastr";
import { connect } from "react-redux";
import { update, isFormValid, generateData } from "../utils/formActions";
import { registerUser } from "../../store/actions/userActions";
import { openModal } from "../../store/actions/modalActions";
const registerBackground = require("../../resources/Images/register-background.jpeg");
class Register extends Component {
  state = {
    loading: false,
    formError: false,
    formSuccess: "",
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
        valid: false,
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
        valid: false,
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
      },
      password: {
        element: "input",
        value: "",
        config: {
          name: "passwordInput",
          type: "password",
          placeholder: "4 - 60 Characters"
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: ""
      },
      confirmPassword: {
        element: "input",
        value: "",
        config: {
          name: "passwordInput",
          type: "password",
          placeholder: "Re-enter Your Password"
        },
        validation: {
          required: true,
          confirm: "password"
        },
        valid: false,
        touched: false,
        validationMessage: ""
      }
    }
  };

  updateForm = element => {
    const newFormData = update(element, this.state.formData, "register");
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

    let formIsValid = isFormValid(this.state.formData, "register");
    let dataToSubmit = generateData(this.state.formData, "register");
    if (formIsValid) {
      this.props.dispatch(registerUser(dataToSubmit)).then(res => {
        if (res.payload.success) {
          this.setState(
            {
              formError: false,
              formSuccess: true
            },
            () => {
              this.props.history.push("/");
              toastr.success("Welcome", "You can now log in");
            }
          );
          setTimeout(() => {
            this.props.dispatch(openModal());
            this.setState({
              loading: false
            });
          }, 2000);
        } else {
          this.setState({
            formError: true
          });
        }
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

  renderError = () => {
    if (this.props.users.registerSuccess && !this.state.loading) {
      return this.props.users.registerSuccess.message;
    } else if (!this.state.loading && !this.props.users.registerSuccess) {
      return "Please Check Your Information";
    }
  };

  render() {
    return (
      <div style={{ height: "100vh" }}>
        <div
          style={{
            background: `url(${registerBackground})`,
            backgroundAttachment: "fixed",
            position: "absolute",
            backgroundSize: "cover",
            height: "100%",
            width: "100%",
            zIndex: "1",
            opacity: "0.08"
          }}
          className="bck_overlay"
        />
        <div className="form_container">
          <div className="form_card">
            <h2>Create An Account</h2>
            <form onSubmit={event => this.submitForm(event)}>
              <div className="form_group">
                <div className="register_label">
                  <label style={{ marginRight: "0px" }} htmlFor="firstName">
                    FIRST NAME
                  </label>
                </div>
                <FormField
                  id={"firstName"}
                  location="register"
                  formData={this.state.formData.firstName}
                  change={element => this.updateForm(element)}
                />
              </div>
              <div className="form_group">
                <div className="register_label">
                  <label style={{ marginRight: "0px" }} htmlFor="lastName">
                    LAST NAME
                  </label>
                </div>
                <FormField
                  id={"lastName"}
                  location="register"
                  formData={this.state.formData.lastName}
                  change={element => this.updateForm(element)}
                />
              </div>
              <div className="form_group">
                <div className="register_label">
                  <label style={{ marginRight: "35px" }} htmlFor="email">
                    EMAIL
                  </label>
                </div>
                <FormField
                  id={"email"}
                  location="register"
                  formData={this.state.formData.email}
                  change={element => this.updateForm(element)}
                />
              </div>
              <div className="form_group">
                <div className="register_label">
                  <label
                    style={{ marginLeft: "60px" }}
                    htmlFor="create password"
                  >
                    CREATE A PASSWORD
                  </label>
                </div>
                <FormField
                  id={"password"}
                  location="register"
                  formData={this.state.formData.password}
                  change={element => this.updateForm(element)}
                />
              </div>
              <div className="form_group">
                <div className="register_label">
                  <label
                    style={{ marginLeft: "60px" }}
                    htmlFor="confirm password"
                  >
                    CONFIRM PASSWORD
                  </label>
                </div>
                <FormField
                  id={"confirmPassword"}
                  location="register"
                  formData={this.state.formData.confirmPassword}
                  change={element => this.updateForm(element)}
                />
              </div>
              <div className="bottom_register_container">
                <Button
                  onClick={event => this.submitForm(event)}
                  variant="outlined"
                  disabled={this.state.loading}
                  style={
                    this.state.loading
                      ? { borderColor: "grey", opacity: "0.4" }
                      : null
                  }
                  className="register_user_btn"
                >
                  Register
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

const mapStateToProps = state => ({
  users: state.users
});

export default connect(mapStateToProps)(Register);
