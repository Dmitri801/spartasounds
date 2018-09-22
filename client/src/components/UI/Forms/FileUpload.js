import React, { Component } from "react";
import Dropzone from "react-dropzone";
import axios from "axios";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import faPlusCircle from "@fortawesome/fontawesome-free-solid/faPlusCircle";
import Spinner from "../Spinner";
class FileUpload extends Component {
  state = {
    uploadedFiles: [],
    uploading: false
  };

  static getDerivedStateFromProps(props, state) {
    if(props.reset) {
      return state = {
        uploadedFiles: []
      }
    }
    return null;
  }

  onDrop = files => {
    this.setState({
      uploading: true
    });
    let formData = new FormData();
    const config = {
      header: { "content-type": "multipart/form-data" }
    };
    formData.append("file", files[0]);
    axios.post("/api/images/upload", formData, config).then(res => {
      this.setState(
        {
          uploading: false,
          uploadedFiles: [...this.state.uploadedFiles, res.data]
        },
        () => {
          this.props.imagesHandler(this.state.uploadedFiles);
        }
      );
    });
  };

  onRemove = id => {
    axios.get(`/api/images/removeimage?public_id=${id}`).then(res => {
      if(res.status === 200) {
        let filteredFiles = this.state.uploadedFiles.filter(
          file => file.public_id !== id
        );
        this.setState(
          {
            uploadedFiles: filteredFiles
          },
          () => {
            this.props.imagesHandler(filteredFiles);
          }
        );
      } else {
        alert('Something Went Wrong..')
      }
    });
  };

  showUploadedImages = () =>
    this.state.uploadedFiles.map(file => (
      <div
        key={file.public_id}
        onClick={() => this.onRemove(file.public_id)}
        style={{ background: `url(${file.url})`, backgroundSize: "cover" }}
        className="dropzone_box_image"
      />
    ));
  render() {
    return (
      <div>
        <section>
          <div className="dropzone">
            <Dropzone
              onDrop={event => this.onDrop(event)}
              multiple={false}
              className="dropzone_box"
            >
              <div
                style={this.state.uploading ? { opacity: "0.1" } : null}
                className="circle_icon"
              >
                <FontAwesomeIcon icon={faPlusCircle} />
              </div>
            </Dropzone>
            {this.state.uploading ? (
              <div>
                <Spinner specialClassName="file_upload_spinner" />
              </div>
            ) : null}
            {this.showUploadedImages()}
          </div>
        </section>
      </div>
    );
  }
}

export default FileUpload;
