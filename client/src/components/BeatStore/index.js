import React from 'react'
const beatStoreBackground = require('../../resources/Images/beatstore_background.jpeg');
const BeatStore = () => {
  return (
    <div className="beatstore_container">
    <div
          style={{
            background: `url(${beatStoreBackground})`,
            
            position: "absolute",
            backgroundSize: "cover",
            height: "120%",
            width: "100%",
            zIndex: "1",
            opacity: "0.2"
          }}
          className="bck_overlay"
        />
      <iframe title="beatStore" src="//www.beatstars.com/player/?storeId=8013" scrolling="no" width="100%" 
      style={{margin: '50px', maxWidth: '1224px', height: '600px'}} frameBorder="0" marginheight="0" marginwidth="0"> -- none -- </iframe>
    </div>
  )
}

export default BeatStore;
