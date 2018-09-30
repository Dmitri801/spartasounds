import React from 'react'

const SideDrawer = (props) => {
    let sideDrawerClasses = ['sideDrawer'];
    if(props.open) {
        sideDrawerClasses = ['sideDrawer', 'open']
    } 
  return (
    <div className={sideDrawerClasses.join(" ")}>
      <ul>
          <li>
              <a>Home</a>
          </li>
          <li>
              <a>Shop</a>
          </li>
          <li>
              <a>Beat Store</a>
          </li>
      </ul>
    </div>
  )
}

export default SideDrawer;
