import React, { Component } from 'react';
import "./NavBar.css";
import { Avatar, Grid, Menu, MenuItem, Popover } from '@mui/material';
import fbLogo from "../../images/logo.png";
import home from "../../images/home.svg";
import page from "../../images/pages.svg";
import watch from "../../images/watch.svg";
import market from "../../images/market.svg";
import group from "../../images/groups.svg";
import messenger from "../../images/facebook-messenger-black.svg";
import SockJS from 'sockjs-client';
import { over } from 'stompjs';


class NavBar extends Component {
  constructor(props) {
    super(props);
    this.anchorRef = React.createRef();
    this.stompClient = null;
  }
  state = {
    anchorEl_messenger : null,
    openMessenger : false,
    connectedFriendList : [],
    lastReceivedMessageSender : null,
  }

  handleOpenMessenger = () => {
    this.setState(
      {
        openMessenger : true,
      }
    );
  }

  handleCloseMessenger = () => {
    this.setState(
      {
        openMessenger : false,
      }
    );
  }

  handleOpenChatBox = (event) => {
    this.setState(
      {
        openMessenger : false,
      }
    );
    this.props.openChatBox(event.currentTarget.id);
  }

  connect = () => {
    var socket = new SockJS('https://facebook-clone-backend-production-693b.up.railway.app/ws');

    this.stompClient = over(socket);
    this.stompClient.connect({}, this.onConnected, this.onError)
  }

  onConnected = () => {
    this.stompClient.subscribe(`/user/${this.props.userId}/queue/messages`, this.onMessageReceived);
    this.stompClient.subscribe(`/user/public`, this.onMessageReceived);

    let token = localStorage.getItem("token").replace(/^"|"$/g, '');
    let auth = "Bearer " + token;
    fetch(`https://facebook-clone-backend-production-693b.up.railway.app/api/v1/user/current/connect`, {
      method: 'POST',
      headers: {
        'Authorization': auth,
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      if (!response.ok) {
        if (response.status === 401) {
          // Handle unauthorized access here
          console.log("Unauthorized access!");
        } else {
          throw new Error('Network response was not ok.');
        }
      }
      return response.json();
    })
    .then(data => {
      this.getConnectedFriends();
    })
    .catch(error => {
      console.log(error);
    });
    

  }

  onError = () => {
  }

  onMessageReceived = (payload) => {  
    this.props.getUserChat();
    const message = JSON.parse(payload.body);
    this.setState(
      { 
        lastReceivedMessageSender: message.senderId
      });
  }

  getConnectedFriends = () => {
    const thisContext = this;
    let token = localStorage.getItem("token").replace(/^"|"$/g, '');
    let auth = "Bearer " + token;
    fetch(`https://facebook-clone-backend-production-693b.up.railway.app/api/v1/user/current/friends`, {
      method: 'GET',
      headers: {
        'Authorization': auth,
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      if (!response.ok) {
        if (response.status === 401) {
          // Handle unauthorized access here
          console.log("Unauthorized access!");
        } else {
          throw new Error('Network response was not ok.');
        }
      }
      return response.json();
    })
    .then(data => {
      this.setState({
        connectedFriendList: data
      }, () => {
        console.log("Updated State:", this.state.connectedFriendList);
      });
    })
    .catch(error => {
      console.log(error);
    });
  }

  componentDidMount() {
    if(!this.stompClient) {
      this.connect();
    }
  }


  render() { 
    return (
      <div> 
        <Grid container className="navBar_main">
          <Grid item xs = {3}>
            <div className="navBar_leftBar">
              <img className="navBar_logo" src={fbLogo} width="35px" onClick={this.props.closePersonalPage}/>
              <input className="navBar_search" type="text" placeholder='Search Facebook'/>
            </div>
          </Grid>
          <Grid item xs = {6}>
            <div className="navBar_middleBar">
              <div className="navBar_tabs active" onClick={this.props.closePersonalPage}>
                <img src={home} className="navBar_tabs_img" />
              </div> 
              <div className="navBar_tabs">
                <img src={watch} className="navBar_tabs_img"/>
              </div>
              <div className="navBar_tabs">
                <img src={market} className="navBar_tabs_img"/>
              </div>
              <div className="navBar_tabs">
                <img src={group} className="navBar_tabs_img"/>
              </div>
              <div className="navBar_tabs">
                <img src={page} className="navBar_tabs_img"/>
              </div>
            </div>
          </Grid>
          <Grid item xs = {3}>
            <div className="navBar_rightBar">
              <div className="navBar_rightTab">
                <div id="navBar_messenger_button" className="navBar_rightTab_itemContainer" aria-controls={this.state.openMessenger ? 'navBar_messenger_menu' : undefined} aria-haspopup="true" aria-expanded={this.state.openMessenger ? 'true' : undefined} onClick={this.handleOpenMessenger}>
                  <img className="navBar_rightTab_itemImg" src={messenger} />
                </div>
                {
                  this.state.lastReceivedMessageSender ? 
                    <div className="navBar_messenger_notify">
                      1
                    </div>
                  :
                    <></>
                }
                <Menu className="navBar_messenger_menu" id="navBar_messenger_menu" anchorOrigin={{vertical: 'bottom', horizontal: 'right'}} transformOrigin={{vertical: 'top', horizontal: 'right'}} anchorEl={this.anchorRef.current} open={this.state.openMessenger} onClose={this.handleCloseMessenger}  MenuListProps={{'aria-labelledby': 'navBar_messenger_button',}}>
                    <div className="navBar_messenger_container">
                      <div className="navBar_messenger_header_text">Chats</div>
                      <input className="navBar_messenger_search" type="text" placeholder='Search Messenger'/>
                      {
                        this.state.connectedFriendList.map((friend) => (
                          <MenuItem className={`navBar_messenger_tab`} id={friend.userId} onClick={this.handleOpenChatBox}>
                            <Avatar src={friend.userImage} />
                            <div className="navBar_messenger_tab_textContainer">
                              <div className={`navBar_messenger_tab_name ${friend.userId === this.state.lastReceivedMessageSender ? 'highlighted' : ''}`}>{friend.userName}</div>

                            </div>
                          </MenuItem>
                        ))
                      }
                    </div>
                  </Menu>
                <div ref={this.anchorRef} className="navBar_rightTab_itemContainer">
                  <Avatar className="navBar_rightImg" src={this.props.userImage} />
                </div>
                <div className="navBar_profileName">{this.props.userName}</div>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}
 
export default NavBar;