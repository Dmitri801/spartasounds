import React from "react";
import UserLayout from "../User";
import UpdatePersonalNfo from "./UpdatePersonalNfo";

const UpdateProfile = props => {
  console.log(props);
  return (
    <UserLayout>
      <UpdatePersonalNfo route={props.history} />
    </UserLayout>
  );
};

export default UpdateProfile;
