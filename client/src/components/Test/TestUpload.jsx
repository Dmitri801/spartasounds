import React from "react";

const TestUpload = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        height: "800px",
        alignItems: "center",
        width: "100%"
      }}
      className="container"
    >
      <div style={{ padding: "25px" }} className="row">
        <div className="col-md-8 m-auto">
          <h1 style={{color: '#fff'}}>Audio File Uploads</h1>
          <form  
          action="http://localhost:8080/api/audio/upload"
          method="POST"
          encType="multipart/form-data">
            <div style={{padding: "15px", color: "#fff"}} className="custom-file mb-3">
              <input
                type="file"
                name="songFile"
                id="songFile"
                className="custom-file-input"
              />
              <label style={{display: 'block', color: 'orange'}} className="custom-file-label" htmlFor="file">
                Choose File
              </label>
            </div>
            <input
              style={{
                  cursor: 'pointer',
                  backgroundColor: 'green',
                  color: 'white'
              }}
              value="Submit"
              className="btn btn-primary btn-block"
              type="submit"
            />
          </form>
          <h1 style={{color: '#fff'}}>Zip File Uploads</h1>
          <form  
          action="http://localhost:8080/api/test/upload"
          method="POST"
          encType="multipart/form-data">
            <div style={{padding: "15px", color: "#fff"}} className="custom-file mb-3">
              <input
                type="file"
                name="testFile"
                id="testFo;e"
                className="custom-file-input"
              />
              <label style={{display: 'block', color: 'orange'}} className="custom-file-label" htmlFor="file">
                Choose File
              </label>
            </div>
            <input
              style={{
                  cursor: 'pointer',
                  backgroundColor: 'green',
                  color: 'white'
              }}
              value="Submit"
              className="btn btn-primary btn-block"
              type="submit"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default TestUpload;
