import React, { Component } from 'react';
import Status from './Status';
import "./StatusBar.css";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"
import Dialog from '@mui/material/Dialog'

class StatusBar extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    open : false,
    uploadImage: null,
    image : null,
    content : []
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
            "statusImageURL" : downloadURL
          }
          

          fetch('https://facebook-clone-backend-production-693b.up.railway.app/api/v1/user/status/create', {
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
            thisContext.getData();
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

  getData = () => {
    const thisContext = this;
    let token = localStorage.getItem("token").replace(/^"|"$/g, '');
    let auth = "Bearer " + token;
    fetch('https://facebook-clone-backend-production-693b.up.railway.app/api/v1/user/statuses', {
      method: 'GET',
      headers: {
        'Authorization': auth,
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => {
      thisContext.setState({content : data.content})
    })
    .catch(error => {
      console.log(error);
    });
    // ...
  } 

  componentDidMount() {
    this.getData();
  }

  render() { 
    return (
      <div className="statusBar_container">
        <Dialog onClose={this.handleClose} open={this.state.open} className="status_upload_dialogBox">
          <div className="status_upload_header" >Create Status </div>
          <img src={this.state.uploadImage} className="status_upload_preview" />
          <input type="button" value="Share to story" onClick={this.uploadToFireStore}  className="status_upload_button" />
        </Dialog>
        <Status uploader="true" openDialog={this.openDialog} userImage={this.props.userImage}/>
        {
          this.state.content.map((item) => (
            <Status object={item}/>
          ))
        }
      </div>
    );
  }
}
 
export default StatusBar;