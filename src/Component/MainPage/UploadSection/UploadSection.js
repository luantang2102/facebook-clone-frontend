import React, { Component } from 'react';
import "./UploadSection.css";
import { Avatar, Paper } from '@mui/material';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import live from "../../../images/video.png";
import image from "../../../images/image.png";
import feeling from "../../../images/feelings.png";
import Dialog from '@mui/material/Dialog';


class UploadSection extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    open : false,
    uploadImage: null,
    image : null,
    description: ""
  }

  handleClose = () => {
    this.setState({open : false});
  }

  handleKeyPress = (event) => {
    const thisContext = this;
    if (event.key === 'Enter') {
      let token = localStorage.getItem("token").replace(/^"|"$/g, '');
      let auth = "Bearer " + token;

      let payload = {
        "description" : thisContext.state.description,
        "postImgURL" : null
      }

      fetch('https://facebook-clone-backend-production-693b.up.railway.app/api/v1/user/post/create', {
        method: 'POST',
        headers: {
          'Authorization': auth,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload),
      })
      .then(response => response.json())
      .then(data => {
        thisContext.props.update();
        thisContext.setState({description: '' });
      })
      .catch(error => {
        console.log(error);
      });
      // ...
    }
  };

  openDialog = (event) => {
    this.setState({open : true});
    this.setState({uploadImage: URL.createObjectURL(event.target.files[0])});
    this.setState({image : event.target.files[0]})
  }

  uploadToFireStore = (event) => {
    const thisContext = this;
    const storage = getStorage();
    const storageRef = ref(storage, this.state.image.name);
    
    const uploadTask = uploadBytesResumable(storageRef, this.state.image);
    
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
          console.log(auth);

          let payload = {
            "description" : thisContext.state.description,
            "postImgURL" : downloadURL
          }
          

          fetch('https://facebook-clone-backend-production-693b.up.railway.app/api/v1/user/post/create', {
            method: 'POST',
            headers: {
              'Authorization': auth,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload),
          })
          .then(response => response.json())
          .then(data => {
            thisContext.setState({open : false});
            thisContext.props.update();
            window.location.reload();
            
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
  
  render() { 
    const tempText = `What's on your mind, ${this.props.userName}?`;
    return (
      <div>
        <Dialog onClose={this.handleClose} open={this.state.open} className="upload_dialogBox">
          <div className="upload_header" >Create Post </div>
          <input type="text" onChange={(event) => {this.state.description = event.currentTarget.value}} className="upload_textBox" placeholder={tempText} />
          <img src={this.state.uploadImage} className="upload_preview" />
          <input type="button" value="Post" onClick={this.uploadToFireStore}  className="upload_button" />
        </Dialog>
        <Paper className="upload_container">
          <div className="upload_top">
            <div>
              <Avatar className="upload_img" src={this.props.userImage} onClick={this.props.openPersonalPage}/>
            </div>
            <div>
              <input className="upload_box" onChange={(event) => {this.setState({description : event.currentTarget.value})}} onKeyDown={this.handleKeyPress}  placeholder={tempText} value={this.state.description || ''} type="text" />
            </div>
          </div>
          <div className="upload_bottom">
            <div className="upload_tabs">
              <img src={live} width="35px"/>
              <div className="upload_text">Live Video</div>
            </div>
            <div className="upload_tabs">
              <label for="file-upload" className="upload_tabs">
               <img src={image} width="35px"/>
               <div className="upload_text">Photo/Video</div>
              </label>
              <input type="file" accept="image/jpeg, image/png" id="file-upload" onChange={this.openDialog} />
            </div>
            <div className="upload_tabs">
              <img src={feeling} width="35px"/>
              <div className="upload_text">Feeling/Activity</div>
            </div>
          </div>
        </Paper> 
      </div>              
    );
  }
}
 
export default UploadSection;