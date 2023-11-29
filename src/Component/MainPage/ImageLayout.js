import { Avatar } from '@mui/material';
import React, { Component } from 'react';

class ImageLayout extends Component {
  constructor(props) {
    super(props);
  }
  state = {  }
  render() { 
    return ( 
      <div className="imageLayout_container">
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