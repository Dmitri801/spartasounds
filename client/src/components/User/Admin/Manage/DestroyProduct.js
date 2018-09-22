import React, { Component } from "react";
import ArrowBack from "@material-ui/icons/ArrowBack";
import Button from "@material-ui/core/Button";
import Spinner from "../../../UI/Spinner";
import FormField from "../../../UI/Forms/FormField";
import { withAlert } from 'react-alert';
import {
    update,
    resetFields
  } from "../../../utils/formActions";
import { removeProduct } from '../../../../store/actions/productActions';
import { connect } from 'react-redux';
class DestroyProduct extends Component {
  state = {
    formError: false,
    formSuccess: false,
    formData: {
      id: {
        element: "input",
        value: "",
        config: {
          name: "idInput",
          type: "text",
          placeholder: "Product Mongo ID"
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
    const newFormData = update(element, this.state.formData, "destroyproduct");
    this.setState({
      formError: false,
      formData: newFormData
    });
  };

  resetFieldHandler = () => {
    const newFormData = resetFields(this.state.formData, "destroyproduct");
    this.setState({
      formData: newFormData,
      formSuccess: true
    });
    this.props.alert.success("Product Removed");
  };

  removeProductHandler = () => {
      let id = this.state.formData.id.value;
      if(id === "") {
        this.props.alert.show("Enter An ID to Delete");
      } else {
        this.props.removeProduct(id).then((res) => {
          if(!res.payload.success) {
            this.props.alert.show("Something Went Wrong, Make Sure You're Entering A Valid Mongo ID")
          }
          this.resetFieldHandler();
        })
      }
  }
  render() {
    return (
      <div className="form_container">
        <div className="form_card manage_card">
          <h2>Remove Product</h2>
          <hr />
          <form onSubmit={() => console.log("Submit")}>
            <div className="form_group">
              <div className="destroy_product_label">
                <label style={{ marginRight: "23px" }} htmlFor="id">
                  PRODUCT ID
                </label>
              </div>
              <FormField
                id={"id"}
                location="destroy_product"
                formData={this.state.formData.id}
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
          <div className="destroy_btn_container">
            <Button
              onClick={event => this.removeProductHandler()}
              variant="contained"
              color="secondary"
              disabled={this.state.loading}
              style={
                this.state.loading
                  ? { borderColor: "grey", opacity: "0.4" }
                  : null
              }
              className="destroy_product_btn"
            >
              DESTROY
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


export default connect(mapStateToProps, {removeProduct})(withAlert(DestroyProduct));