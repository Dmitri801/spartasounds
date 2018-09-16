import React, { Component } from "react";
import MusicPlayer from "../UI/MusicPlayer/MusicPlayer";
import { closeMusicPlayer } from "../../store/actions/musicPlayerActions";
import PageTop from "../UI/PageTop";
import { connect } from "react-redux";
import {
  getGenres,
  getCategories,
  getProductsToShop
} from "../../store/actions/productActions";
import CollapsibleCheckbox from "../UI/CollapsibleSelections/CollapseCheckbox";
import CollapsibleRadio from "../UI/CollapsibleSelections/CollapseRadio";
import { getAllAudio } from "../../store/actions/audioTrackActions";
import { instruments, price } from "../utils/fixed_categories";
import LoadShopCards from "./LoadShopCards";
class Shop extends Component {
  state = {
    grid: "",
    limit: 4,
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

    this.props.getProductsToShop(
      this.state.skip,
      this.state.limit,
      this.state.filters
    );

    this.props.getAllAudio();
  }

  handlePrice = value => {
    const data = price;
    let array = [];

    for (let key in data) {
      if (data[key]._id === parseInt(value, 10)) {
        array = data[key].array;
      }
    }
    return array;
  };

  handleFilters = (filters, option) => {
    const newFilters = { ...this.state.filters };
    newFilters[option] = filters;

    if (option === "price") {
      let priceValues = this.handlePrice(filters);
      newFilters[option] = priceValues;
    }
    this.showFilteredResults(newFilters);
    this.setState({
      filters: newFilters
    });
  };

  showFilteredResults = filters => {
    this.props.getProductsToShop(0, this.state.limit, filters).then(() => {
      this.setState({
        skip: 0
      });
    });
  };

  loadMoreCards = () => {
    let skip = this.state.skip + this.state.limit;

    this.props.getProductsToShop(
      skip, 
      this.state.limit,
      this.state.filters,
      this.props.products.toShop
    ).then(() => {
      this.setState({
        skip
      })
    })
  }
  render() {
    const { products } = this.props;
    return (
      <div style={{ width: "100%" }}>
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
                  this.handleFilters(filters, "category")
                }
              />
              <CollapsibleRadio
                initState={false}
                title="Price"
                list={price}
                handleFilters={filters => this.handleFilters(filters, "price")}
              />
            </div>
            <div className="right">
              <div className="shop_options">
                
              </div>
              <LoadShopCards
                grid={this.state.grid}
                limit={this.state.limit}
                size={products.toShopSize}
                list={products.toShop}
                loadMore={() => this.loadMoreCards()}
              />
            </div>
          </div>
        </div>
        <MusicPlayer closeMusicPlayer={this.props.closeMusicPlayer} />
      </div>
    );
  }
}

const mapStateToProps = ({ products }) => ({
  products
});

export default connect(
  mapStateToProps,
  { getGenres, getCategories, getProductsToShop, closeMusicPlayer, getAllAudio }
)(Shop);
