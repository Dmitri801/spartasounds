import React, { Component } from "react";
import PageTop from "../UI/PageTop";
import Spinner from "../UI/Spinner";
import { getProduct } from "../../store/actions/productActions";
import { connect } from "react-redux";
class ProductDetail extends Component {
  state = {
    loading: true
  };
  componentDidMount() {
    this.loadProduct();
  }

  loadProduct = () => {
    const id = this.props.match.params.id;
    this.props.getProduct(id).then(() => {
      this.setState({ loading: false });
    });
  };

  renderDetailPage = () => {
    if (this.state.loading) {
      return <Spinner specialClassName="detail_page_spinner" />;
    } else {
      const kit = this.props.products.shownProduct;
      return (
        <div className="header_container">
          <div className="header_pic">
            <img src={kit.images[0].url} alt="mainImg" />
          </div>
          <div className="details">details</div>
        </div>
      );
    }
  };
  render() {
    const { shownProduct } = this.props.products;
    return (
      <div>
        <PageTop title={shownProduct ? shownProduct.name : ""} />
        {this.renderDetailPage()}
      </div>
    );
  }
}

const mapStateToProps = ({ products }) => ({
  products
});

export default connect(
  mapStateToProps,
  { getProduct }
)(ProductDetail);
