import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import FormField from "../UI/Forms/FormField";
import Spinner from "../UI/Spinner";
import { connect } from "react-redux";
import { update, isFormValid, generateData } from "../utils/formActions";
import { withRouter } from "react-router-dom";
import { loginUser, resetLogin } from "../../store/actions/userActions";
import { closeModal } from "../../store/actions/modalActions";
import Modal from "../UI/Modal";
class Login extends Component {
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

  resetLoginForm = () => {
    this.props.dispatch(closeModal());
    this.setState(prevState => ({
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
    }));
    setTimeout(() => {
      this.setState({
        loading: false
      });
    }, 1500);
  };

  closeIcon = () => (
    <i onClick={this.resetLoginForm} className="fas fa-times closeIcon" />
  );

  onRegisterClick = () => {
    this.props.history.push("/register");
    this.resetLoginForm();
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
          this.resetLoginForm();
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

  renderError = () => {
    if (this.props.users.loginSuccess && !this.state.loading) {
      return this.props.users.loginSuccess.message;
    } else if (!this.state.loading && !this.props.users.loginSuccess) {
      return "Please Check Your Information";
    }
  };
  render() {
    const { loginModalOpen } = this.props;
    const { loading } = this.state;
    return (
      <Modal
        closeIcon={this.closeIcon}
        hr={true}
        modalTitle="Log In"
        fullWidth={true}
        modalOpen={loginModalOpen}
        titleClassName="login_header"
      >
        <form onSubmit={event => this.submitForm(event)}>
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
          <p style={loading ? { opacity: "0.4" } : null}>
            Not a member yet?
            <span onClick={this.onRegisterClick}>Register Here </span>
          </p>
          {this.state.formError ? (
            <div className="error_label_bottom">
              <p>{this.renderError()}</p>
            </div>
          ) : null}
        </form>
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  users: state.users,
  loginModalOpen: state.loginModalOpen.loginModalOpen
});

export default connect(mapStateToProps)(withRouter(Login));
