import React, { Component } from 'react';
import NavBar from '../NavBar/NarBar';
import Layout from '../MainPage/Layout';
import LoginPage from '../LoginPage/LoginPage';
import { Dialog } from '@mui/material';
import "./Base.css";
import PersonalPage from '../PersonalPage/PersonalPage';

class Base extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    openDialog : false,
    userName : null,
    userImage : null,
    loading: true,
    openPersonalPage : false,
  }

  updateCurrentUser = (data) => {
    this.setState(
      {
        userName : data.userName,
        userImage : data.userImage
      });
  }

  openPersonalPage = () => {
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
      fetch('http://localhost:8080/api/v1/user/current', {
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
            userImage : data.userImage,
            userName : data.userName,
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
      // ...
    }
    else {
      this.setState({loading : false});
    }
  }

  removeToken = () => {
    localStorage.removeItem("token");
    window.location.reload();
  }

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
            localStorage.getItem("token")==undefined ?
              <LoginPage updateCurrentUser={this.updateCurrentUser}/>
              :
              <span> 
                <NavBar userName={this.state.userName} userImage={this.state.userImage} closePersonalPage={this.closePersonalPage}/> 
                {
                  this.state.openPersonalPage ? 
                    <PersonalPage />
                    :
                    <Layout openPersonalPage={this.openPersonalPage} userId={this.state.userId} userName={this.state.userName} userImage={this.state.userImage} /> 
                }
              </span>
          }
        </div>
      </div>
    );
  }
}
 
export default Base;