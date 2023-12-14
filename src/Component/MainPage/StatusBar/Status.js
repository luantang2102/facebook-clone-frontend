import { Paper } from '@mui/material';
import React, { Component } from 'react';
import uploadIcon from "../../../images/upload.png";

class Status extends Component {
  constructor(props) {
    super(props);
  }
  state = {  }

  render() { 
    return (
      <div>
        {
          this.props.uploader==="true" ? 
          <Paper className="statusBar_status">
            <label for="file-upload-status">
              <img src={uploadIcon} className="upload_icon" />
            </label>
            <input type="file" accept="image/jpeg, image/png" id="file-upload-status" onChange={this.props.openDialog} />
          </Paper>
          :
          <Paper className="statusBar_status" >
            <img src={this.props.object.statusImageURL} className="status_image" />
          </Paper>
        }
      </div>
    );
  }
}
 
export default Status;