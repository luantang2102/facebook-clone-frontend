import React, { Component, createRef } from 'react';
import './MainPage.css';
import { Grid, Menu } from '@mui/material';
import LeftSide from './LeftSidePanel/LeftSide';
import StatusBar from './StatusBar/StatusBar';
import UploadSection from './UploadSection/UploadSection';
import PostContainer from './PostContainer/PostContainer';
import RightSide from './RightSidePanel/RightSide';

class Layout extends Component {
  constructor(props) {
    super(props);
    this.childRef = createRef();
  }
  state = { 
  }

  postUpdate = () => {
    if (this.childRef.current) {
      this.childRef.current.getData();
    }
  }
  render() { 
    return (
      <div className="mainPage_container">
        <Grid container >
          <Grid item xs = {3}>
            <div>
              <LeftSide openPersonalPage={this.props.openPersonalPage} userId={this.props.userId} userName={this.props.userName} userImage={this.props.userImage}/>
            </div>
          </Grid>
          <Grid item xs = {6} >
            <div className="middle_container">
              <StatusBar userImage={this.props.userImage}/>
              <UploadSection openPersonalPage={this.handleOpenCurrentUserPersonalPage} update={this.postUpdate} userName={this.props.userName} userImage={this.props.userImage}/>
              <PostContainer ref={this.childRef} userName={this.props.userName} userImage={this.props.userImage} openPersonalPage={this.props.openPersonalPage}/>
            </div>
          </Grid>
          <Grid item xs = {3}>
            <div>
              <RightSide openPersonalPage={this.props.openPersonalPage}/>
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}
 
  export default Layout;
