import React from 'react'
import { Link } from 'react-router-dom';

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
       </div>
        <div className="user_right">
         {props.children}
        </div>
      </div>
    </div>
  )
}

export default UserLayout;
