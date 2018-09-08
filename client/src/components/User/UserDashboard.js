import React from 'react'
import UserLayout from './index';
import Button from "@material-ui/core/Button";
const userDashboardBackground = require('../../resources/Images/user-dashboard-background.jpeg');
const UserDashboard = (props) => {
  
  return (
    <UserLayout>
      <div
          style={{
            background: `url(${userDashboardBackground})`,
            backgroundAttachment: "fixed",
            position: "absolute",
            backgroundSize: "cover",
            backgroundPosition: "100px",
            height: "110%",
            width: "98%",
            zIndex: "1",
            opacity: "0.1"
          }}
          className="bck_overlay"
        />
      <div className="user_info">
      <div className="user_info_panel">
        <h1>Your Information</h1>
        <div className="user_info_textContent">
          <span>{props.authedUser.firstName ? props.authedUser.firstName : "You Have No First Name.."}</span>
          <span>{props.authedUser.lastName ? props.authedUser.lastName : "You Have No Last Name.."}</span>
          <span>{props.authedUser.email}</span>
        </div>
        <Button className="user_info_btn" variant="contained" onClick={() => props.history.push('user/user_profile')}>Edit Account Information</Button>
      </div>
      <div className="user_info_panel">
          <h1>Sound History</h1>
          <div className="user_product_block_wrapper">
            History
          </div>
        </div>
      </div>
    </UserLayout>
  )
}

export default UserDashboard;