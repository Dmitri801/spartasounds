import React, { Component } from "react";
import PageTop from "../UI/PageTop";
import { connect } from "react-redux";
import { getGenres, getCategories } from "../../store/actions/productActions";
import CollapsibleCheckbox from "../UI/CollapsibleSelections/CollapseCheckbox";
import CollapsibleRadio from '../UI/CollapsibleSelections/CollapseRadio';
import { instruments, price } from "../utils/fixed_categories";
class Shop extends Component {
  state = {
    grid: "",
    limit: 6,
    skip: 0,
    filters: {
      genre: [],
      instrument: [],
      category: [],
      price: []
    }
  };
  componentDidMount() {
    this.props.getGenres();
    this.props.getCategories();
  }

  handlePrice = (value) => {
    const data = price;
    let array = []

    for(let key in data) {
      if(data[key]._id === parseInt(value, 10)) {
        array = data[key].array
      }
    }
      return array;
  }

  handleFilters = (filters, option) => {
    const newFilters = {...this.state.filters}
    newFilters[option] = filters;

    if(option === "price") {
      let priceValues = this.handlePrice(filters);
      newFilters[option] = priceValues
    }
    this.setState({
      filters: newFilters
    })
  };
  render() {
    console.log(this.state.filters);
    const { products } = this.props;
    return (
      <div style={{width: "100%" }}>
        <PageTop title="Browse Sounds" />

        <div className="container">
          <div className="shop_wrapper">
            <div className="left">
              <CollapsibleCheckbox
                initState={false}
                title="Genres"
                list={products.genres}
                handleFilters={filters => this.handleFilters(filters, "genre")}
              />
              <CollapsibleCheckbox
                initState={false}
                title="Instruments"
                list={instruments}
                handleFilters={filters =>
                  this.handleFilters(filters, "instruments")
                }
              />
              <CollapsibleCheckbox
                initState={false}
                title="Categories"
                list={products.categories}
                handleFilters={filters =>
                  this.handleFilters(filters, "categories")
                }
              />
               <CollapsibleRadio
                initState={false}
                title="Price"
                list={price}
                handleFilters={filters =>
                  this.handleFilters(filters, "price")
                }
              />
            </div>
            <div className="right">right</div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ products }) => ({
  products
});

export default connect(
  mapStateToProps,
  { getGenres, getCategories }
)(Shop);
