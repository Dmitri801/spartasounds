import React from 'react'
import UserLayout from './index';
import Button from "@material-ui/core/Button";

const UserDashboard = (props) => {
  
  return (
    <UserLayout>
      <div
          style={{
            background: `url('https://images.unsplash.com/photo-1485809885770-fefe16c8f8fb?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=d34150b5506268d2ac72dbb10c9b220a&auto=format&fit=crop&w=1354&q=80')`,
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