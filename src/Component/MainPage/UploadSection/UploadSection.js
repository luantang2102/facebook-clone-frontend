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
          

          fetch('http://localhost:8080/api/v1/user/post/create', {
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
    return (
      <div>
        <Dialog onClose={this.handleClose} open={this.state.open} className="upload_dialogBox">
          <div className="upload_header" >Create Post </div>
          <input type="text" onChange={(event) => {this.state.description = event.currentTarget.value}} className="upload_textBox" placeholder="What's on your mind, Luân?" />
          <img src={this.state.uploadImage} className="upload_preview" />
          <input type="button" value="Post" onClick={this.uploadToFireStore}  className="upload_button" />
        </Dialog>
        <Paper className="upload_container">
          <div className="upload_top">
            <div>
              <Avatar className="upload_img" src="https://scontent.fsgn5-12.fna.fbcdn.net/v/t39.30808-6/399927049_1760513474408864_4532997899325130267_n.jpg?stp=cp6_dst-jpg&_nc_cat=103&ccb=1-7&_nc_sid=5f2048&_nc_ohc=uAH63iJVwgcAX9LIu8a&_nc_ht=scontent.fsgn5-12.fna&oh=00_AfB8iTjdb7u_QvifQmPNtNFV0588sc7Dyjhpyo3nvo2L8A&oe=6559B3F8" />
            </div>
            <div>
              <input className="upload_box" placeholder="What's on your mind, Luân?" type="text" />
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