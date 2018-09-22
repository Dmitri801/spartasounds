import React, { Component } from "react";
import ArrowBack from "@material-ui/icons/ArrowBack";
import Button from "@material-ui/core/Button";
import Spinner from "../../../UI/Spinner";
import FormField from "../../../UI/Forms/FormField";
import { withAlert } from 'react-alert';
import {
    update,
    isFormValid,
    generateData,
    resetFields
  } from "../../../utils/formActions";
import { addGenre, clearGenre } from '../../../../store/actions/productActions';
import { connect } from 'react-redux';
class ManageGenre extends Component {
  state = {
    formError: false,
    formSuccess: false,
    formData: {
      name: {
        element: "input",
        value: "",
        config: {
          name: "nameInput",
          type: "text",
          placeholder: "Genre Name"
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: "",
        showLabel: true
      }
    }
  };
  updateForm = element => {
    const newFormData = update(element, this.state.formData, "addgenre");
    this.setState({
      formError: false,
      formData: newFormData
    });
  };

  resetFieldHandler = () => {
    const newFormData = resetFields(this.state.formData, "addgenre");
    this.setState({
      formData: newFormData,
      formSuccess: true
    });
    this.props.alert.success("Genre Added");
    setTimeout(() => {
      this.props.clearGenre();
    }, 500);
  };

  submitForm = e => {
    e.preventDefault();

    let formIsValid = isFormValid(this.state.formData, "addgenre");
    let dataToSubmit = generateData(this.state.formData, "addgenre");
    if (formIsValid) {
      this.props.addGenre(dataToSubmit).then(res => {
          this.resetFieldHandler()
      })
    } else {
      this.setState({
        formError: true
      });
      this.props.alert.show("Check Your Data Bruh");
      
    }
  };

  render() {
    return (
      <div className="form_container">
        <div className="form_card manage_card">
          <h2>Add A New Genre</h2>
          <hr />
          <form onSubmit={() => console.log("Submit")}>
            <div className="form_group">
              <div className="add_genre_label">
                <label style={{ marginRight: "23px" }} htmlFor="name">
                  GENRE
                </label>
              </div>
              <FormField
                id={"name"}
                location="add_genre"
                formData={this.state.formData.name}
                change={element => this.updateForm(element)}
              />
            </div>
          </form>
          <div className="back_btn_container">
            <div onClick={() => this.props.back()} className="back_btn">
              <h1>Back</h1>
              <div className="arrow_back">
                <ArrowBack fontSize="inherit" />
              </div>
            </div>
          </div>
          <div className="addgenre_btn_container">
            <Button
              onClick={event => this.submitForm(event)}
              variant="contained"
              color="secondary"
              disabled={this.state.loading}
              style={
                this.state.loading
                  ? { borderColor: "grey", opacity: "0.4" }
                  : null
              }
              className="add_genre_btn"
            >
              Add Genre
            </Button>
            {this.state.loading && (
              <Spinner specialClassName="manage_spinner" />
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({products}) => ({
    products
})

export default connect(mapStateToProps, {addGenre, clearGenre})(withAlert(ManageGenre));
