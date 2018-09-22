import React from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const links = [
    {
        name: "Account",
        linkTo: "/user/dashboard"
    },
    {
        name: "Profile",
        linkTo: "/user/user_profile"
    },
    {
        name: "Cart",
        linkTo: "/user/cart"
    }
]

const admin = [
    {
        name: "Site Info",
        linkTo: "/admin/site_info"
    },
    {
        name: "Add Product",
        linkTo: "/admin/add_product"
    },
    {
        name: "Manage Products",
        linkTo: "/admin/manage_products"
    }, 
    {
        name: "Upload Files",
        linkTo: "/admin/upload"
    }
]

const generateLinks = (links) => {
    return (
        links.map((item, index) => (
            <div key={index}>
            <Link to={item.linkTo} >
             {item.name}
            </Link>
            <hr />
            </div>
        ))
    )
}

const UserLayout = (props) => {
  return (
    <div className="container">
      <div className="user_container">
       <div className="user_left_nav">
            <h2>My Account</h2>
            <div className="links">
             { generateLinks(links) }
            </div>
            {props.users.authedUser.isAdmin ? (
                <div>
                <h2 style={{color: "#f3b169",  marginTop: "100px"}}>Admin</h2>
                <div className="links">
                 { generateLinks(admin) }
                </div>
                </div>
            ) : null}
       </div>
        <div className="user_right">
         {props.children}
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = ({users}) => ({
    users
})

export default connect(mapStateToProps)(UserLayout);
