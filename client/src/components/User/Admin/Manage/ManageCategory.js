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
import { addCategory, clearCategory } from '../../../../store/actions/productActions';
import { connect } from 'react-redux';
class ManageCategory extends Component {
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
          placeholder: "Category Name"
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
    const newFormData = update(element, this.state.formData, "addcategory");
    this.setState({
      formError: false,
      formData: newFormData
    });
  };
  resetFieldHandler = () => {
    const newFormData = resetFields(this.state.formData, "addcategory");
    this.setState({
      formData: newFormData,
      formSuccess: true
    });
    this.props.alert.success("Category Added");
    setTimeout(() => {
      this.props.clearCategory();
    }, 500);
  };

  submitForm = e => {
    e.preventDefault();

    let formIsValid = isFormValid(this.state.formData, "addcategory");
    let dataToSubmit = generateData(this.state.formData, "addcategory");
    if (formIsValid) {
      this.props.addCategory(dataToSubmit).then(res => {
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
          <h2>Add A New Category</h2>
          <hr />
          <form onSubmit={() => console.log("Submit")}>
            <div className="form_group">
              <div className="add_category_label">
                <label style={{ marginRight: "23px" }} htmlFor="name">
                  CATEGORY
                </label>
              </div>
              <FormField
                id={"name"}
                location="add_category"
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
          <div className="addcategory_btn_container">
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
              className="add_category_btn"
            >
              Add Category
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

export default connect(mapStateToProps, {addCategory, clearCategory})(withAlert(ManageCategory));