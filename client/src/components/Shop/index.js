import React, { Component } from 'react'
import PageTop from '../UI/PageTop';
import { connect } from 'react-redux';
import { getGenres, getCategories } from '../../store/actions/productActions';
import CollapseCheckbox from '../UI/CollapseCheckbox';
class Shop extends Component {
    componentDidMount() {
        this.props.getGenres()
        this.props.getCategories();
    }

    handleFilters = () => {
      console.log('filter')
    }
  render() {
      const {products} = this.props;
    return (
      <div style={{height: "1000px", width: "100%"}}>
          <PageTop
           title="Browse Sounds"
          />

        <div className="container">
         <div className="shop_wrapper">
          <div className="left">
           <CollapseCheckbox 
            initState={true}
            title="Genres"
            list={products.genres}
            handleFilters={(filters) => this.handleFilters(filters, 'genre')}
           />
          </div>
          <div className="right">
            right
          </div>
         </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({products}) => ({
    products
})

export default connect(mapStateToProps, {getGenres, getCategories})(Shop);
