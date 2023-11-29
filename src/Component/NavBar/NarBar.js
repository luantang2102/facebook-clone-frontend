import React, { Component } from 'react';
import "./NavBar.css";
import { Avatar, Grid } from '@mui/material';
import fbLogo from "../../images/logo.png";
import home from "../../images/home.svg";
import page from "../../images/pages.svg";
import watch from "../../images/watch.svg";
import market from "../../images/market.svg";
import group from "../../images/groups.svg";


class NavBar extends Component {
  constructor(props) {
    super(props);
  }
  state = {  }
  render() { 
    return (
      <div> 
        <Grid container className="navBar_main">
          <Grid item xs = {3}>
            <div className="navBar_leftBar">
              <img className="navBar_logo" src={fbLogo} width="35px" />
              <input className="navBar_search" type="text" placeholder='Search Facebook'/>
            </div>
          </Grid>
          <Grid item xs = {6}>
            <div className="navBar_middleBar">
              <div className="navBar_tabs active">
                <img src={home} height="37px" width="37px"/>
              </div>
              <div className="navBar_tabs">
                <img src={watch} height="37px" width="37px"/>
              </div>
              <div className="navBar_tabs">
                <img src={market} height="37px" width="37px"/>
              </div>
              <div className="navBar_tabs">
                <img src={group} height="37px" width="37px"/>
              </div>
              <div className="navBar_tabs">
                <img src={page} height="37px" width="37px"/>
              </div>
            </div>
          </Grid>
          <Grid item xs = {3}>
            <div className="navBar_rightBar">
              <div className="navBar_rightTab">
                <Avatar className="navBar_rightImg" src="https://scontent.fsgn5-12.fna.fbcdn.net/v/t39.30808-6/399927049_1760513474408864_4532997899325130267_n.jpg?stp=cp6_dst-jpg&_nc_cat=103&ccb=1-7&_nc_sid=5f2048&_nc_ohc=uAH63iJVwgcAX9LIu8a&_nc_ht=scontent.fsgn5-12.fna&oh=00_AfB8iTjdb7u_QvifQmPNtNFV0588sc7Dyjhpyo3nvo2L8A&oe=6559B3F8" />
                <div className="navBar_profileName"> Luân Tăng</div>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}
 
export default NavBar;