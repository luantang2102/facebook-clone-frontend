import React, { Component } from 'react';
import NavBar from '../NavBar/NarBar';
import Layout from '../MainPage/Layout';
import LoginPage from '../LoginPage/LoginPage';
import { Avatar, Dialog, Menu, Paper, Popper } from '@mui/material';
import "./Base.css";
import PersonalPage from '../PersonalPage/PersonalPage';
import close from "../../images/x-solid.svg";

class Base extends Component {
  stompClient = null;
  constructor(props) {
    super(props);
    this.bottomRef = React.createRef();
  }
  state = {
    openDialog : false,
    userId : null,
    userName : null,
    userImage : null,
    userCoverImage : null,
    totalFriends : null,
    friendList : [],

    loading: true,
    openPersonalPage : false,
    isCurrentUser : true,

    targetUserId : null,
    targetUserName : null,
    targetUserImage : null,
    targetUserCoverImage: null,
    targetUserTotalFriends : null,
    targetUserFriendList : [],

    openChatBox : false,
    userChat : [],
    message : null
  }

  updateCurrentUser = (data) => {
    this.setState(
      {
        userName : data.userName,
        userImage : data.userImage,
        userCoverImage : data.userCoverImage,
        totalFriends : data.totalFriends,
        friendList : data.friendList
      });
  }

  getTargetUser = (userId) => {
    const thisContext = this;
    let token = localStorage.getItem("token").replace(/^"|"$/g, '');
    let auth = "Bearer " + token;
    fetch(`https://facebook-clone-backend-production-f262.up.railway.app/api/v1/user/${userId}`, {
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
      
      
      if(data.userId === thisContext.state.userId) {
        thisContext.setState(
          { 
            targetUserId : data.userId,
            targetUserImage : data.userImage,
            targetUserCoverImage : data.userCoverImage,
            targetUserName : data.userName,
            targetUserTotalFriends : data.totalFriends,
            loading : false,
            isCurrentUser : true
          });
      }
      else {
        thisContext.setState(
          { 
            targetUserId : data.userId,
            targetUserImage : data.userImage,
            targetUserCoverImage : data.userCoverImage,
            targetUserName : data.userName,
            targetUserTotalFriends : data.totalFriends,
            loading : false,
            isCurrentUser : false
          });
      }
    })
    .catch(error => {
      console.log(error);
    });
    // ...
  }

  openPersonalPage = userId => {
    this.setState({loading : true})
    console.log(userId);
    this.getTargetUser(userId);
    this.setState({openPersonalPage : true});
  }

  closePersonalPage = () => {
    this.setState({openPersonalPage : false});
  }

  componentDidMount() {
    if(localStorage.getItem("token")!=undefined) {
      const thisContext = this;
      let token = localStorage.getItem("token").replace(/^"|"$/g, '');
      let auth = "Bearer " + token;
      fetch('https://facebook-clone-backend-production-f262.up.railway.app/api/v1/user/current', {
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
       
        thisContext.setState(
          { 
            userId : data.userId,
            userImage : data.userImage,
            userCoverImage : data.userCoverImage,
            userName : data.userName,
            totalFriends : data.totalFriends,
            loading : false  
          });
      })
      .catch(error => {
        this.setState(
          {
            openDialog : true,
            loading : false
          })
        console.log(error);
      });
    }
    else {
      this.setState({loading : false});
    }
  }

  removeToken = () => {
    localStorage.removeItem("token");
    window.location.reload();
  }

  handleOpenChatBox = userId => {
    const thisContext = this;
    let token = localStorage.getItem("token").replace(/^"|"$/g, '');
    let auth = "Bearer " + token;
    fetch(`https://facebook-clone-backend-production-f262.up.railway.app/api/v1/user/${userId}`, {
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
    thisContext.setState(
      { 
        targetUserId : data.userId,
        targetUserImage : data.userImage,
        targetUserName : data.userName,
      },
      () => {
        thisContext.getUserChat();
      })
    })
    .catch(error => {
      console.log(error);
    });
    // ...
  }


  handleCloseChatBox = () => {
    this.setState(
      {
        openChatBox : false,
      }
    );
  }

  getUserChat = () => {
    const thisContext = this;
    let token = localStorage.getItem("token").replace(/^"|"$/g, '');
    let auth = "Bearer " + token;
    fetch(`https://facebook-clone-backend-production-f262.up.railway.app/api/v1/user/current/messages/${this.state.targetUserId}`, {
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
      console.log(DataTransfer);
      thisContext.setState({
        userChat : data,
      },
      () => {
        if(!thisContext.state.openChatBox) {
          console.log(this.state.userChat);
          thisContext.setState({
            openChatBox : true
          })
        }
      })
    })
    .catch(error => {
      console.log(error);
    });   
  }

  sendMessage = () => {
    const thisContext = this;
    let token = localStorage.getItem("token").replace(/^"|"$/g, '');
    let auth = "Bearer " + token;

    let payload = {
      "senderId" : this.state.userId,
      "recipientId" : this.state.targetUserId,
      "content" : this.state.message
    };
    
    fetch('https://facebook-clone-backend-production-f262.up.railway.app/api/v1/user/chat', {
      method: 'POST',
      headers: {
        'Authorization': auth,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload),
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
      return response;
    })
    .then(data => {
      thisContext.getUserChat();
    })
    .catch(error => {
      console.log(error);
    });
  }

  handleChatKeyPress = (event) => {
    if (event.key === 'Enter' && this.state.message) {
      this.sendMessage();
      this.setState({
        message : ''
      })
    }
  };

  render() { 
    if (this.state.loading) {
      return <div>Loading...</div>;
    }
    return (
      <div>
        <Dialog open={this.state.openDialog} className="expired_dialogBox">
          <div className="title"> Session Expired</div>
          <div className="description"> Please log in again</div>
          <div className="load_container">
            <div className="tab"></div>
            <input className="load" type="button" value="OK" onClick={this.removeToken} />
          </div>
        </Dialog>
        <div>
          {
            localStorage.getItem("token")===null || localStorage.getItem("token")===undefined ?
              <LoginPage updateCurrentUser={this.updateCurrentUser}/>
              :
              <div className="base"> 
                <NavBar userId={this.state.userId} userName={this.state.userName} userImage={this.state.userImage} closePersonalPage={this.closePersonalPage} openChatBox={this.handleOpenChatBox} getUserChat={this.getUserChat}/> 
                {
                  this.state.openPersonalPage ? 
                    <PersonalPage  openPersonalPage={this.openPersonalPage} userId={this.state.targetUserId} userName={this.state.targetUserName} userImage={this.state.targetUserImage} userCoverImage={this.state.targetUserCoverImage} isCurrentUser={this.state.isCurrentUser} totalFriends={this.state.targetUserTotalFriends}/>
                    :
                    <Layout openPersonalPage={this.openPersonalPage} userId={this.state.userId} userName={this.state.userName} userImage={this.state.userImage} /> 
                }
                <div className="bottom_container" >
                  <div className='bottom_tab' ref={this.bottomRef}></div>
                </div>
                <Popper className="chatBox" open={this.state.openChatBox} anchorEl={this.bottomRef.current}  placement="top-end" onClose={this.state.openChatBox}>
                    <Paper>
                      <div className="chatBox_container">
                        <div className="chatBox_exit" onClick={this.handleCloseChatBox}>
                            <div className="chatBox_exitButton">
                              <img src={close}/>
                            </div>
                        </div>
                        <div className="chatBox_header_container">
                          <Avatar src={this.state.targetUserImage} />
                          <div className="chatBox_header_name">
                            {this.state.targetUserName}
                          </div>
                        </div>
                        <div className="chatBox_chat_container">
                          {this.state.userChat.map(chatMessage => (
                            chatMessage.senderId === this.state.userId ? (
                              <div key={chatMessage.messageId} className="chatBox_chat_currentChat">
                                <div className="chatBox_chat_currentChat_text_container">
                                  <div className='chatBox_chat_currentChat_text'>
                                    {chatMessage.content}
                                  </div>
                                </div>
                              </div>
                            ) : (
                              <div key={chatMessage.messageId} className="chatBox_chat_friendChat">
                                <div className="chatBox_chat_friendChat_text_container">
                                  <div className='chatBox_chat_friendChat_text'>
                                    {chatMessage.content}
                                  </div>
                                </div>
                              </div>
                            )
                          ))}
                        </div>
                        <div className="chatBox_insert_container">
                          <input className="chatBox_insert_text" type="text" placeholder='Aa' onChange={(event) => {this.setState({message : event.currentTarget.value})}} onKeyDown={this.handleChatKeyPress} value={this.state.message || ''} />
                        </div>
                      </div>
                    </Paper>
                </Popper>
              </div>
          }
        </div>
      </div>
    );
  }
}
 
export default Base;