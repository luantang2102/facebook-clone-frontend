import React, { Component } from 'react';
import NavBar from '../NavBar/NarBar';
import Layout from '../MainPage/Layout';
import LoginPage from '../LoginPage/LoginPage';
import { Dialog } from '@mui/material';
import "./Base.css";

class Base extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    open : false,
    userName : null,
    userImage : null,
    loading: true
  }

  updateCurrentUser = (data) => {
    this.setState(
      {
        userName : data.userName,
        userImage : data.userImage
      });
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
            open : true,
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
        <Dialog open={this.state.open} className="expired_dialogBox">
          <div className="title"> Session Expired</div>
          <div className="description"> Please log in again</div>
          <div className="load_container">
            <div className="tab"></div>
            <input className="load" type="button" value="OK" onClick={this.removeToken} />
          </div>
        </Dialog>
        <div>
          {
            localStorage.getItem("token")==undefined ? <LoginPage updateCurrentUser={this.updateCurrentUser}/> : <span> <NavBar userName={this.state.userName} userImage={this.state.userImage} /> <Layout userName={this.state.userName} userImage={this.state.userImage} /> </span>
          }
        </div>
      </div>
    );
  }
}
 
export default Base;