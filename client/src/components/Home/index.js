import React from 'react';
import Featured from "./Featured";

const Home = () => {
  return (
    <div  className="bck_dark">
     <div  style={{
      background: `url('https://images.pexels.com/photos/736355/pexels-photo-736355.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260')`,
      position: 'absolute',
      height: '100%',
      width: '100%',
      opacity: '0.2'
    }} className="bck_overlay" />
      <Featured />
    </div>
  );
};

export default Home;