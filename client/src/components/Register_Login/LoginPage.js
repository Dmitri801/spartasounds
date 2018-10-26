import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import FormField from "../UI/Forms/FormField";
import Spinner from "../UI/Spinner";
import { connect } from "react-redux";
import { update, isFormValid, generateData } from "../utils/formActions";
import { withRouter } from "react-router-dom";
import { loginUser, resetLogin } from "../../store/actions/userActions";

class LoginPage extends Component {
  state = {
    loading: false,
    formError: false,
    formSuccess: "",
    formData: {
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
          placeholder: "Enter Your Password"
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: ""
      }
    }
  };
  onRegisterClick = () => {
    this.props.history.push("/register");
  };

  updateForm = element => {
    const newFormData = update(element, this.state.formData, "login");
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

    this.props.dispatch(resetLogin());

    let formIsValid = isFormValid(this.state.formData, "login");
    let dataToSubmit = generateData(this.state.formData, "login");
    if (formIsValid) {
      this.props.dispatch(loginUser(dataToSubmit)).then(response => {
        if (response.payload.loginSuccess) {
          this.props.history.push("/user/dashboard");
        } else {
          setTimeout(() => {
            this.setState({
              formError: true,
              loading: false
            });
          }, 500);
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

  onEnterSubmit = event => {
    if (event.keyCode === 13) {
      document.querySelectorAll(".form_field_block")[1].blur();
      document.querySelectorAll(".form_field_block")[3].blur();
      setTimeout(() => {
        this.submitForm(event);
      }, 30);
    }
  };

  renderError = () => {
    if (this.props.users.loginSuccess && !this.state.loading) {
      return this.props.users.loginSuccess.message;
    } else if (!this.state.loading && !this.props.users.loginSuccess) {
      return "Please Check Your Information";
    }
  };
  render() {
    const { loading } = this.state;
    return (
      <div className="login_page">
        <div className="loginpage_card">
          <h1>Log In</h1>
          <hr />
          <form onKeyDown={event => this.onEnterSubmit(event)}>
            <div className="login_label">
              <label htmlFor="email">EMAIL</label>
            </div>
            <FormField
              id={"email"}
              location="login"
              formData={this.state.formData.email}
              change={element => this.updateForm(element)}
            />
            <div className="login_label">
              <label htmlFor="password">PASSWORD</label>
            </div>
            <FormField
              id={"password"}
              location="login"
              formData={this.state.formData.password}
              change={element => this.updateForm(element)}
            />
            <hr />

            <div className="bottom_login_container">
              <Button
                onClick={event => this.submitForm(event)}
                className="login_user_btn"
                disabled={loading}
                style={
                  loading ? { backgroundColor: "grey", opacity: "0.4" } : null
                }
                variant="contained"
              >
                Log In
              </Button>
              {loading && <Spinner specialClassName="login_spinner" />}
            </div>
            <p style={loading ? { opacity: "0.4" } : { color: "#fff" }}>
              Not a member yet?
              <span onClick={this.onRegisterClick}>Register Here </span>
            </p>
            {this.state.formError ? (
              <div className="error_label_bottom">
                <p>{this.renderError()}</p>
              </div>
            ) : null}
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  users: state.users
});

export default connect(mapStateToProps)(withRouter(LoginPage));
