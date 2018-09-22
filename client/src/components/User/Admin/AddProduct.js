import React, { Component } from "react";
import {
  update,
  isFormValid,
  generateData,
  populateOptionFields,
  resetFields
} from "../../utils/formActions";
import { withAlert } from "react-alert";
import FormField from "../../UI/Forms/FormField";
import UserLayout from "../index.js";
import {
  getGenres,
  getCategories,
  addProduct,
  clearProduct
} from "../../../store/actions/productActions";
import { connect } from "react-redux";
import ArrowForward from "@material-ui/icons/ArrowForward";
import ArrowBack from "@material-ui/icons/ArrowBack";
import Button from "@material-ui/core/Button";
import Spinner from "../../UI/Spinner";
import FileUpload from "../../UI/Forms/FileUpload";
const userDashboardBackground = require("../../../resources/Images/user-dashboard-background.jpeg");
class AddProduct extends Component {
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
          placeholder: "Product Name"
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: "",
        showLabel: true
      },
      description: {
        element: "textarea",
        value: "",
        config: {
          name: "descriptionInput",
          type: "text",
          placeholder: "Product Description"
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: ""
      },
      price: {
        element: "input",
        value: "",
        config: {
          name: "priceInput",
          type: "number",
          placeholder: "Price"
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: "",
        showLabel: true
      },
      genre: {
        element: "select",
        value: "",
        config: {
          name: "genreInput",
          placeholder: "Genre",
          options: []
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: ""
      },
      category: {
        element: "select",
        value: "",
        config: {
          name: "categoryInput",
          placeholder: "Category",
          options: []
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: ""
      },
      instruments: {
        element: "select",
        value: "",
        config: {
          name: "instrumentInput",
          placeholder: "Instruments Included",
          options: []
        },
        validation: {
          required: false
        },
        valid: true,
        touched: false,
        validationMessage: ""
      },
      demoTrack: {
        element: "input",
        value: "",
        config: {
          name: "demoTrackInput",
          type: "text",
          placeholder: "Demo Track Mongo ID"
        },
        validation: {
          required: false
        },
        valid: true,
        touched: false,
        validationMessage: "",
        showLabel: true
      },
      sampleLength: {
        element: "input",
        value: "",
        config: {
          name: "sampleLengthInput",
          type: "number",
          placeholder: "Sample Length"
        },
        validation: {
          required: false
        },
        valid: false,
        touched: false,
        validationMessage: "",
        showLabel: true
      },
      publish: {
        element: "select",
        value: "",
        config: {
          name: "publishInput",
          placeholder: "Available to purchase or download",
          options: [
            { key: true, value: "Public" },
            { key: false, value: "Private" }
          ]
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: "",
        showLabel: true
      },
      images: {
        value: [],
        validation: {
          required: false
        },
        valid: true,
        touched: false,
        validationMessage: "",
        showLabel: false
      }
    },
    page: 1
  };

  componentDidMount() {
    const formData = this.state.formData;
    this.props.getGenres().then(() => {
      const newFormData = populateOptionFields(
        formData,
        this.props.products.genres,
        "genre"
      );
      this.updateFields(newFormData);
    });
    this.props.getCategories().then(() => {
      const newFormData = populateOptionFields(
        formData,
        this.props.products.categories,
        "category"
      );
      this.updateFields(newFormData);
    });
  }

  updateFields = newFormData => {
    this.setState({ formData: newFormData });
  };

  updateForm = element => {
    const newFormData = update(element, this.state.formData, "products");
    this.setState({
      formError: false,
      formData: newFormData
    });
  };

  resetFieldHandler = () => {
    const newFormData = resetFields(this.state.formData, "products");
    this.setState({
      formData: newFormData,
      formSuccess: true
    });
    this.props.history.push("/");
    setTimeout(() => {
      this.props.clearProduct();
      this.props.alert.success("Product Added");
    }, 500);
  };

  submitForm = e => {
    e.preventDefault();

    let formIsValid = isFormValid(this.state.formData, "products");
    let dataToSubmit = generateData(this.state.formData, "products");
    if (formIsValid) {
      this.props.addProduct(dataToSubmit).then(() => {
        if (this.props.products.newProduct.success) {
          this.resetFieldHandler();
        } else {
          this.setState({
            formError: true
          });
        }
      });
    } else {
      this.setState({
        formError: true
      });
      this.props.alert.show("Check Your Data Bruh");
      console.log(this.state.formData);
    }
  };
  imagesHandler = (images) => {
    const newFormData = {
      ...this.state.formData,
    }
    newFormData['images'].value = images;
    newFormData['images'].valid = true;

    this.setState({
      formData: newFormData
    })
  };
  render() {
    const { page } = this.state;
    let pageToLoad;
    if (page === 1) {
      pageToLoad = (
        <div className="form_container">
          <div className="form_card add_product_card">
            <h2>Add A New Product</h2>
            <form onSubmit={() => this.submitForm()}>
              <FileUpload
                imagesHandler={images => this.imagesHandler(images)}
                reset={this.state.formSuccess}
              />
              <div style={{ paddingBottom: "15px" }} className="form_group">
                <div className="add_product_label">
                  <label style={{ marginRight: "0px" }} htmlFor="name">
                    PRODUCT NAME
                  </label>
                </div>
                <FormField
                  id={"name"}
                  location="add_product"
                  formData={this.state.formData.name}
                  change={element => this.updateForm(element)}
                />
              </div>
              <div style={{ marginTop: "10px" }} className="form_group">
                <div className="add_product_label">
                  <label style={{ marginRight: "-40px" }} htmlFor="description">
                    PRODUCT DESCRIPTION
                  </label>
                </div>
                <FormField
                  id={"description"}
                  location="add_product_description"
                  formData={this.state.formData.description}
                  change={element => this.updateForm(element)}
                />
              </div>
              <div className="form_group">
                <div className="add_product_label">
                  <label style={{ marginRight: "60px" }} htmlFor="price">
                    PRICE
                  </label>
                </div>
                <span className="price_input">
                  <FormField
                    id={"price"}
                    location="add_product"
                    formData={this.state.formData.price}
                    change={element => this.updateForm(element)}
                  />
                </span>
              </div>
            </form>
            <div className="next_btn_container">
              <div
                onClick={() =>
                  this.setState(prevState => ({ page: prevState.page + 1 }))
                }
                className="next_btn"
              >
                <h1>Next</h1>
                <div className="arrow_forward">
                  <ArrowForward fontSize="inherit" />
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else if (page === 2) {
      pageToLoad = (
        <div className="form_container">
          <div className="form_card add_product_card">
            <h2>Add A New Product</h2>
            <form onSubmit={() => this.submitForm()}>
              <div className="form_group">
                <div className="add_product_label">
                  <label style={{ marginRight: "65px" }} htmlFor="genre">
                    GENRE
                  </label>
                </div>
                <FormField
                  id={"genre"}
                  location="add_product"
                  formData={this.state.formData.genre}
                  change={element => this.updateForm(element)}
                />
              </div>
              <div className="form_group">
                <div className="add_product_label">
                  <label style={{ marginRight: "45px" }} htmlFor="category">
                    CATEGORY
                  </label>
                </div>
                <FormField
                  id={"category"}
                  location="add_product"
                  formData={this.state.formData.category}
                  change={element => this.updateForm(element)}
                />
              </div>
              <div className="form_group">
                <div className="add_product_label">
                  <label style={{ marginRight: "17px" }} htmlFor="instruments">
                    INSTRUMENTS
                  </label>
                </div>
                <FormField
                  id={"instruments"}
                  location="add_product"
                  formData={this.state.formData.instruments}
                  change={element => this.updateForm(element)}
                />
              </div>
              <div className="form_group">
                <div className="add_product_label">
                  <label style={{ marginRight: "55px" }} htmlFor="publish">
                    PUBLISH
                  </label>
                </div>
                <FormField
                  id={"publish"}
                  location="add_product"
                  formData={this.state.formData.publish}
                  change={element => this.updateForm(element)}
                />
              </div>
              <div className="form_group">
                <div className="add_product_label">
                  <label style={{ marginRight: "23px" }} htmlFor="demoTrack">
                    DEMO TRACK
                  </label>
                </div>
                <FormField
                  id={"demoTrack"}
                  location="add_product"
                  formData={this.state.formData.demoTrack}
                  change={element => this.updateForm(element)}
                />
              </div>
              <div className="form_group">
                <div className="add_product_label">
                  <label htmlFor="sampleLength">SAMPLE LENGTH</label>
                </div>
                <FormField
                  id={"sampleLength"}
                  location="add_product"
                  formData={this.state.formData.sampleLength}
                  change={element => this.updateForm(element)}
                />
              </div>
            </form>
            <div className="back_btn_container">
              <div
                onClick={() =>
                  this.setState(prevState => ({ page: prevState.page - 1 }))
                }
                className="back_btn"
              >
                <h1>Back</h1>
                <div className="arrow_back">
                  <ArrowBack fontSize="inherit" />
                </div>
              </div>
            </div>
            <div className="addproduct_btn_container">
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
                className="add_product_btn"
              >
                Add Product
              </Button>
              {this.state.loading && (
                <Spinner specialClassName="add_product_spinner" />
              )}
            </div>
          </div>
        </div>
      );
    }
    return (
      <div style={{ height: "1000px" }}>
        <div
          style={{
            background: `url(${userDashboardBackground})`,
            backgroundAttachment: "fixed",
            position: "absolute",
            backgroundSize: "cover",
            height: "1000px",
            width: "100%",
            zIndex: "1",
            opacity: "0.18"
          }}
          className="bck_overlay"
        />
        <UserLayout>{pageToLoad}</UserLayout>
      </div>
    );
  }
}

const mapStateToProps = ({ products }) => ({
  products
});

export default connect(
  mapStateToProps,
  { getGenres, getCategories, addProduct, clearProduct }
)(withAlert(AddProduct));
