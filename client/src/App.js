import React, { Component } from "react";
import Layout from "./components/Layout";
import Auth from "./components/HOC/Auth";
import { Switch, Route } from "react-router-dom";
import Register from "./components/Register_Login/Register";
import UserDashboard from "./components/User/UserDashboard";
import BeatStore from "./components/BeatStore";
import Shop from "./components/Shop";
import Home from "./components/Home";
import AddProduct from "./components/User/Admin/AddProduct";
import Manage from "./components/User/Admin/Manage/index.js";
import ProductDetail from "./components/Product";
import UserCart from "./components/User/UserCart";
import UpdateProfile from "./components/User/UpdateProfile";
import ManageSite from "./components/User/Admin/ManageSite";
import LoginPage from "./components/Register_Login/LoginPage";
import TestUpload from "./components/Test/TestUpload";

class App extends Component {
  render() {
    return (
      <Layout>
        <Switch>
          <Route path="/" exact component={Auth(Home, null)} />
          <Route path="/login" exact component={Auth(LoginPage, null)} />
          <Route
            path="/user/dashboard"
            exact
            component={Auth(UserDashboard, true)}
          />
          <Route path="/user/cart" exact component={Auth(UserCart, true)} />
          <Route
            path="/admin/add_product"
            exact
            component={Auth(AddProduct, true)}
          />
          <Route
            path="/admin/manage_products"
            exact
            component={Auth(Manage, true)}
          />
          <Route
            path="/admin/site_info"
            exact
            component={Auth(ManageSite, true)}
          />
          <Route
            path="/user/user_profile"
            exact
            component={Auth(UpdateProfile, true)}
          />
          <Route
            path="/thedetails/:id"
            exact
            component={Auth(ProductDetail, null)}
          />
          <Route path="/shop" exact component={Auth(Shop, null)} />
          <Route path="/beatstore" exact component={Auth(BeatStore, null)} />
          <Route path="/register" exact component={Auth(Register, false)} />
          <Route path="/test/upload" exact component={Auth(TestUpload, true)} />
        </Switch>
      </Layout>
    );
  }
}

export default App;
