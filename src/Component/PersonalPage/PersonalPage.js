import React, { Component } from 'react';
import "../PersonalPage/PersonalPage.css"
import { Avatar, Dialog, Menu, MenuItem, Paper } from '@mui/material';
import plus from "../../images/plus-solid.svg";
import pencil from "../../images/pencil-solid.svg";
import down from "../../images/chevron-down-solid.svg";
import moreDown from "../../images/caret-down-solid.svg";
import close from "../../images/x-solid.svg";
import addFriend from "../../images/user-plus-solid.svg";
import checkedFriend from "../../images/user-check-solid.svg";
import checkedFriend_white from "../../images/user-check-solid-white.svg";
import uncheckedFriend from "../../images/user-xmark-solid.svg";
import message from "../../images/facebook-messenger.svg";
import message_white from "../../images/facebook-messenger-white.svg";
import UploadSection from '../MainPage/UploadSection/UploadSection';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import PostContainer from '../MainPage/PostContainer/PostContainer';
import { eventWrapper } from '@testing-library/user-event/dist/utils';

class PersonalPage extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    openEditProfile : false,
    openEditProfilePicture: false,
    openEditCoverPhoto: false,
    activeTab : "Posts",

    uploadProfileImage: null,
    uploadCoverImage: null,

    updateProfileImage : null,
    updateCoverImage: null,

    isFriend : false,
    isRequest: false,
    isRespond : false,

    anchorEl_respond : null,
    openPopUp_respond : false,

    anchorEl_friend : null,
    openPopUp_friend : false,
  }

  handleTabClick = (tabName) => {
    this.setState({activeTab : tabName});
  }

  handleCloseEditProfiles = () => {
    this.setState({openEditProfile : false});
  }

  openEditDialog = () => {
    this.setState({openEditProfile : true});
  }

  handleCloseChooseProfilePicture = () => {
    this.setState({openEditProfilePicture : false});
  }

  openEditProfilePictureDialog = (event) => {
    this.setState({openEditProfilePicture : true});
    this.setState({uploadProfileImage : URL.createObjectURL(event.target.files[0])});
    this.setState({updateProfileImage : event.target.files[0]});
  }

  handleCloseChooseCoverPhoto = () => {
    this.setState({openEditCoverPhoto : false});
  }

  openEditCoverPhotoDialog = (event) => {
    this.setState({openEditCoverPhoto : true});
    this.setState({uploadCoverImage : URL.createObjectURL(event.target.files[0])});
    this.setState({updateCoverImage : event.target.files[0]});
  }

  checkIfFriend = () => {
    const thisContext = this; 
    let token = localStorage.getItem("token").replace(/^"|"$/g, '');
    let auth = "Bearer " + token;

    fetch(`https://facebook-clone-backend-production-f262.up.railway.app/api/v1/user/current/friend/${this.props.userId}/isFriend`, {
      method: 'GET',
      headers: {
        'Authorization': auth,
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => {
      if(data) {
        thisContext.setState(
          {
            isFriend : data
          });     
      }           
    })
    .catch(error => {
      console.log(error);
    });
    // ...
  }
 
  checkIfRespond = () => {
    const thisContext = this; 
    let token = localStorage.getItem("token").replace(/^"|"$/g, '');
    let auth = "Bearer " + token;
    
    fetch(`https://facebook-clone-backend-production-f262.up.railway.app/api/v1/user/current/friend/pending/${this.props.userId}/isOnPending`, {
      method: 'GET',
      headers: {
        'Authorization': auth,
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => {
      if(data) {
        thisContext.setState(
          {
            isRespond : data
          });     
      }                
    })
    .catch(error => {
      console.log(error);
    });
    // ...
  }

  checkIfRequest = () => {
    const thisContext = this; 
    let token = localStorage.getItem("token").replace(/^"|"$/g, '');
    let auth = "Bearer " + token;
    
    fetch(`https://facebook-clone-backend-production-f262.up.railway.app/api/v1/user/${this.props.userId}/friend/pending/isOnPending`, {
      method: 'GET',
      headers: {
        'Authorization': auth,
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => {
      if(data) {
        thisContext.setState(
          {
            isRequest : data
          });     
      }                
    })
    .catch(error => {
      console.log(error);
    });
    // ...
  }

  handleAddFriend = () => {
    const thisContext = this; 
    let token = localStorage.getItem("token").replace(/^"|"$/g, '');
    let auth = "Bearer " + token;
    
    fetch(`https://facebook-clone-backend-production-f262.up.railway.app/api/v1/user/${this.props.userId}/friend/pending/add`, {
      method: 'PUT',
      headers: {
        'Authorization': auth,
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => {
      thisContext.setState(
        {
          isFriend : false,
          isRespond : false,
          isRequest : true
        });                   
    })
    .catch(error => {
      console.log(error);
    });
    // ...
  } 

  handleCancelRequest = () => {
    const thisContext = this; 
    let token = localStorage.getItem("token").replace(/^"|"$/g, '');
    let auth = "Bearer " + token;
    
    fetch(`https://facebook-clone-backend-production-f262.up.railway.app/api/v1/user/${this.props.userId}/friend/pending/remove`, {
      method: 'PUT',
      headers: {
        'Authorization': auth,
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => {
      thisContext.setState(
        {
          isFriend : false,
          isRespond : false,
          isRequest : false,

        });                   
    })
    .catch(error => {
      console.log(error);
    });
    // ...
  }

  handleRespond = (event) => {
    this.setState(
      {
        anchorEl_respond: event.currentTarget,
        openPopUp_respond: true
      },
    );
  }

  handlePopUpRespondClose = () => {
    this.setState(
      {
        anchorEl_respond : null,
        openPopUp_respond : false
      }
    );
  }

  handleConfirmRequest = () => {
    const thisContext = this; 
    let token = localStorage.getItem("token").replace(/^"|"$/g, '');
    let auth = "Bearer " + token;
    
    fetch(`https://facebook-clone-backend-production-f262.up.railway.app/api/v1/user/current/friend/add/${this.props.userId}`, {
      method: 'PUT',
      headers: {
        'Authorization': auth,
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => {
      thisContext.setState(
        {
          isFriend : true,
          isRespond : false,
          isRequest : false,
          anchorEl_respond : null,
          openPopUp_respond: false
        });                   
    })
    .catch(error => {
      console.log(error);
    });
    // ...
  }

  handleDeleteRequest = () => {
    const thisContext = this; 
    let token = localStorage.getItem("token").replace(/^"|"$/g, '');
    let auth = "Bearer " + token;
    
    fetch(`https://facebook-clone-backend-production-f262.up.railway.app/api/v1/user/current/friend/pending/remove/${this.props.userId}`, {
      method: 'PUT',
      headers: {
        'Authorization': auth,
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => {
      thisContext.setState(
        {
          isFriend : false,
          isRespond : false,
          isRequest : false,
          anchorEl_respond : null,
          openPopUp_respond : false
        });                   
    })
    .catch(error => {
      console.log(error);
    });
    // ...
  }

  handleFriend = (event) => {
    this.setState(
      {
        anchorEl_friend: event.currentTarget,
        openPopUp_friend: true
      }
    );
  }

  handlePopUpFriendClose = () => {
    this.setState(
      {
        anchorEl_friend : null,
        openPopUp_friend : false
      }
    );
  }

  handleUnfriend = () => {
    const thisContext = this; 
    let token = localStorage.getItem("token").replace(/^"|"$/g, '');
    let auth = "Bearer " + token;
    
    fetch(`https://facebook-clone-backend-production-f262.up.railway.app/api/v1/user/current/friend/remove/${this.props.userId}`, {
      method: 'PUT',
      headers: {
        'Authorization': auth,
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => {
      thisContext.setState(
        {
          isFriend : false,
          isRespond : false,
          isRequest : false,
          anchorEl_friend : null,
          openPopUp_friend : false
        });                   
    })
    .catch(error => {
      console.log(error);
    });
    // ...
  }

  uploadToFireStore = (event) => {
    const thisContext = this;
    let image;
    if(this.state.openEditProfilePicture) {
      image = this.state.updateProfileImage;
    }
    else if(thisContext.state.openEditCoverPhoto) {
      image = this.state.updateCoverImage;
    }
    const storage = getStorage();
    const storageRef = ref(storage, image.name);
    
    const uploadTask = uploadBytesResumable(storageRef, image);
    
    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    uploadTask.on('state_changed', 
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }
      }, 
      (error) => {
        console.log(error);
      }, 
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log('File available at', downloadURL);

          let token = localStorage.getItem("token").replace(/^"|"$/g, '');
          let auth = "Bearer " + token;
            
          let payload;
          if(thisContext.state.openEditProfilePicture) {
            payload = {
              "userName": this.props.userName,
              "userImage": downloadURL,
              "userCoverImage": this.props.userCoverImage
            }
          }
          else if(thisContext.state.openEditCoverPhoto) {
            payload = {
              "userName": this.props.userName,
              "userImage": this.props.userImage,
              "userCoverImage": downloadURL
            }
          }

          fetch(`https://facebook-clone-backend-production-f262.up.railway.app/api/v1/user/current/update`, {
            method: 'PUT',
            headers: {
              'Authorization': auth,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload),
          })
          .then(response => response.json())
          .then(data => {
            thisContext.setState(
              {
                openEditProfile: false,
                openEditProfilePicture : false,
                openEditCoverPhoto: false
              });                
          })
          .catch(error => {
            console.log(error);
          });
          // ...
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log(error);
        });
      }  
    );
  }

  componentDidMount() {
    this.checkIfFriend();
    this.checkIfRespond();
    this.checkIfRequest();
  }

  render() { 
    return (
      <div>
        {
          this.props.isCurrentUser ?
            <Dialog open={this.state.openEditProfile} className="edit_dialogBox" maxWidth="sm">
              <Dialog open={this.state.openEditProfilePicture} className="edit_dialogBox">
                <div className="edit_container">
                  <div className="edit_close_container">
                    <label for="close_edit_profilePicture" className="edit_close">
                      <img src={close}/>
                    </label>
                    <input type="button" id="close_edit_profilePicture" onClick={this.handleCloseChooseProfilePicture}/>
                  </div>
                  <div className="edit_container">
                    <div className="edit_header" >
                      <div className="edit_header_text">Choose profile picture</div>
                    </div>
                    <Avatar src={this.state.uploadProfileImage} className="edit_profilePicture_preview" sx={{ width: 170, height: 170 }}/>
                    <input type="button" value="Save" onClick={this.uploadToFireStore}  className="upload_button" />  
                  </div>
                </div>
              </Dialog>
              <Dialog open={this.state.openEditCoverPhoto} className="edit_dialogBox">
                <div className="edit_container">
                  <div className="edit_close_container">
                    <label for="close_edit_profilePicture" className="edit_close">
                      <img src={close}/>
                    </label>
                    <input type="button" id="close_edit_profilePicture" onClick={this.handleCloseChooseCoverPhoto}/>
                  </div>
                  <div className="edit_container">
                    <div className="edit_header" >
                      <div className="edit_header_text">Choose profile picture</div>
                    </div>
                    <img src={this.state.uploadCoverImage} className="edit_coverImage"/>
                    <input type="button" value="Save" onClick={this.uploadToFireStore}  className="upload_button" />  
                  </div>
                </div>
              </Dialog>
              <div className="edit_container">
                <div className="edit_close_container">
                  <label for="close_edit" className="edit_close">
                    <img src={close}/>
                  </label>
                  <input type="button" id="close_edit" onClick={this.handleCloseEditProfiles}/>
                </div>
                <div className="edit_header" >
                  <div className="edit_header_text">Edit profile</div>  
                </div>
                <div className="edit_profilePicture_header">
                  <div className="edit_profilePicture_header_left">Profile picture</div>
                  <div className="edit_profilePicture_header_right">
                    <label for="edit_profile_photo" className="edit_profilePicture_header_right_text">Edit</label>
                    <input type="file" accept="image/jpeg, image/png" id="edit_profile_photo" onChange={this.openEditProfilePictureDialog}/>
                  </div>
                </div>
                <Avatar src={this.props.userImage} sx={{ width: 170, height: 170}}/>
                <div className="edit_profilePicture_header">
                  <div className="edit_profilePicture_header_left">Cover photo</div>
                  <div className="edit_profilePicture_header_right">
                    <label for="edit_cover_photo" className="edit_profilePicture_header_right_text">Edit</label>
                    <input type="file" accept="image/jpeg, image/png" id="edit_cover_photo" onChange={this.openEditCoverPhotoDialog}/>
                  </div>
                </div>
                <Paper className="edit_coverImage">
                  <img src={this.props.userCoverImage} className="edit_coverImage"/>
                </Paper>
              </div>
            </Dialog>
            :
            <div></div>
        }
        
        <div className="main_container">
          <div className="top_container">
            <div className="pp_container">
              <img src={this.props.userCoverImage} className="pp_coverImage" />
              <div className="pp_headerContainer">
                <div className="pp_headerContainer_top">
                  <div className="pp_userImage_container">
                    <Avatar src={this.props.userImage} sx={{ width: 170, height: 170 }}/>
                  </div>
                  <div className="pp_userNameContainer">
                    <div className="pp_userName">{this.props.userName}</div>
                    <div className="pp_userTotalFriends">{this.props.totalFriends} friends</div>
                  </div>
                  <div className="pp_userNickname">    </div>
                  {
                    this.props.isCurrentUser ?
                      <div className="pp_buttonContainer">
                        <label for="add_story" className="pp_firstButton">
                          <img src={plus} className="pp_button_image"/>
                          <div className="pp_firstButton_text">Add to story</div>
                        </label>
                        <input type="button" id="add_story"/>
                        <label for="edit_profile" className="pp_secButton">
                          <img src={pencil} className="pp_button_image"/>
                          <div className="pp_secButton_text">Edit profile</div>
                        </label>
                        <input type="button" id="edit_profile" onClick={this.openEditDialog}/>
                        <label for="suggest_friends" className="pp_thirdButton">
                          <img src={down} className="pp_button_image"/>
                        </label>
                        <input type="button" id="suggest_friends"/>
                      </div>
                      :
                      this.state.isFriend ? 
                        <div className="pp_buttonContainer">
                          <label id="friend_button" for="add_friend" className="pp_secButton" aria-controls={this.state.openPopUp_friend ? 'friend_menu' : undefined} aria-haspopup="true" aria-expanded={this.state.openPopUp_friend ? 'true' : undefined} onClick={this.handleFriend}>
                            <img src={checkedFriend} className="pp_button_image"/>
                            <div className="pp_secButton_text">Friends</div>
                          </label>
                          <Menu id="friend_menu" anchorEl={this.state.anchorEl_friend} open={this.state.openPopUp_friend} onClose={this.handlePopUpFriendClose} MenuListProps={{'aria-labelledby': 'friend_button',}}>
                            <MenuItem onClick={this.handleUnfriend}>Unfriend</MenuItem> 
                          </Menu>
                          <input type="button" id="add_friend"/>
                          <label for="message" className="pp_firstButton">
                            <img src={message_white} className="pp_button_image"/>
                            <div className="pp_firstButton_text">Message</div>
                          </label>
                          <input type="button" id="message"/>
                          <label for="suggest_friends" className="pp_thirdButton">
                            <img src={down} className="pp_button_image"/>
                          </label>
                          <input type="button" id="suggest_friends"/>
                        </div>
                        :
                        this.state.isRequest ? 
                          <div className="pp_buttonContainer">
                            <label for="add_friend" className="pp_firstButton">
                              <img src={uncheckedFriend} className="pp_button_image"/>
                              <div className="pp_firstButton_text">Cancel Request</div>
                            </label>
                            <input type="button" id="add_friend" onClick={this.handleCancelRequest}/>
                            <label for="message" className="pp_secButton">
                              <img src={message} className="pp_button_image"/>
                              <div className="pp_secButton_text">Message</div>
                            </label>
                            <input type="button" id="message"/>
                            <label for="suggest_friends" className="pp_thirdButton">
                              <img src={down} className="pp_button_image"/>
                            </label>
                            <input type="button" id="suggest_friends"/>
                          </div>
                          :
                          this.state.isRespond ? 
                            <div className="pp_buttonContainer">
                              <label id="respond_button" for="add_friend" className="pp_firstButton" aria-controls={this.state.openPopUp_respond ? 'respond_menu' : undefined} aria-haspopup="true" aria-expanded={this.state.openPopUp_respond ? 'true' : undefined} onClick={this.handleRespond}>
                                <img src={checkedFriend_white} className="pp_button_image"/>
                                <div className="pp_firstButton_text">Respond</div>
                              </label>
                              <Menu id="respond_menu" anchorEl={this.state.anchorEl_respond} open={this.state.openPopUp_respond} onClose={this.handlePopUpRespondClose} MenuListProps={{'aria-labelledby': 'respond_button',}}>
                                <MenuItem onClick={this.handleConfirmRequest}>Confirm</MenuItem>
                                <MenuItem onClick={this.handleDeleteRequest}>Delete request</MenuItem> 
                              </Menu>
                              <input type="button" id="add_friend"/>
                              <label for="message" className="pp_secButton">
                                <img src={message} className="pp_button_image"/>
                                <div className="pp_secButton_text">Message</div>
                              </label>
                              <input type="button" id="message"/>
                              <label for="suggest_friends" className="pp_thirdButton">
                                <img src={down} className="pp_button_image"/>
                              </label>
                              <input type="button" id="suggest_friends"/>
                            </div>
                            :
                            <div className="pp_buttonContainer">
                              <label for="add_friend" className="pp_firstButton">
                                <img src={addFriend} className="pp_button_image"/>
                                <div className="pp_firstButton_text">Add Friend</div>
                              </label>
                              <input type="button" id="add_friend" onClick={this.handleAddFriend}/>
                              <label for="message" className="pp_secButton">
                                <img src={message} className="pp_button_image"/>
                                <div className="pp_secButton_text">Message</div>
                              </label>
                              <input type="button" id="message"/>
                              <label for="suggest_friends" className="pp_thirdButton">
                                <img src={down} className="pp_button_image"/>
                              </label>
                              <input type="button" id="suggest_friends"/>
                            </div>
                  }
                </div>
                <div className="pp_headerContainer_bottom">
                  <div className="pp_headerContainer_bottom_content">
                    <div className={`pp_headerContainer_bottom_content_tabs ${this.state.activeTab === 'Posts' ? 'active' : ''}`} onClick={() => this.handleTabClick('Posts')} >Posts</div>
                    <div className={`pp_headerContainer_bottom_content_tabs ${this.state.activeTab === 'About' ? 'active' : ''}`} onClick={() => this.handleTabClick('About')} >About</div>
                    <div className={`pp_headerContainer_bottom_content_tabs ${this.state.activeTab === 'Friends' ? 'active' : ''}`} onClick={() => this.handleTabClick('Friends')} >Friends</div>
                    <div className={`pp_headerContainer_bottom_content_tabs ${this.state.activeTab === 'Photos' ? 'active' : ''}`} onClick={() => this.handleTabClick('Photos')} >Photos</div>
                    <div className={`pp_headerContainer_bottom_content_tabs ${this.state.activeTab === 'Videos' ? 'active' : ''}`} onClick={() => this.handleTabClick('Videos')} >Videos</div>
                    <div className={`pp_headerContainer_bottom_content_tabs ${this.state.activeTab === 'Reels' ? 'active' : ''}`} onClick={() => this.handleTabClick('Reels')} >Reels</div>
                    <div className={`pp_headerContainer_bottom_content_tabs ${this.state.activeTab === 'More' ? 'active' : ''}`} onClick={() => this.handleTabClick('More')} >
                      <div>More</div>
                      <img src={moreDown} className="pp_button_image"/>
                    </div>
                  </div> 
                </div>
              </div>
            </div>
          </div>
          <div className="bottom_container">
            {
              this.state.activeTab === "Posts" ? 
                <div className="bottom_posts_container">
                  <div className="bottom_posts_left_container">
                    <Paper className="friends_container">
                      <div className="friends_container_header">
                        <div className="friends_container_header_text">Friends</div>
                      </div>
                    </Paper>
                  </div>
                  <div className="bottom_posts_right_container">
                    {
                      this.props.isCurrentUser ? 
                      <UploadSection userName={this.props.userName} userImage={this.props.userImage}/>
                      :
                      <Paper className="filter_container">
                        <div className="filter_header_text">
                          Posts
                        </div>
                      </Paper>
                    }
                    <PostContainer userId={this.props.userId} userName={this.props.userName} userImage={this.props.userImage} openPersonalPage={this.props.openPersonalPage}/>
                  </div>
                </div>
                :
                <div>NONE</div>
            }
          </div>
        </div>
      </div>
    );
  }
}
 
export default PersonalPage;