import { Avatar } from '@mui/material';
import React, { Component } from 'react';

class ImageLayout extends Component {
  constructor(props) {
    super(props);
  }
  state = {}

  handleOpenPersonalPage = () => {
    this.props.openPersonalPage(this.props.userId);
  }

  render() { 
    return ( 
      <div className="imageLayout_container" onClick={this.handleOpenPersonalPage}>
        <div className="imageLayout_imgLay">
          <Avatar className="imageLayout_img" src= {this.props.image} />
        </div>
        <div className="imageLayout_text">
          {this.props.text}
        </div>
      </div>
    );
  }
}
 
export default ImageLayout;