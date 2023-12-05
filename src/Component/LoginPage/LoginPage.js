import { Grid } from '@mui/material';
import { Paper } from '@mui/material';
import { auth } from "../../firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import React, { Component } from 'react';
import "./LoginPage.css";

class LoginPage extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    isLogin: true,

    //sign in
    signIn_email : null,
    signIn_password : null,

    //sign up
    signUp_name: null,
    signUp_email: null,
    signUp_password: null,
  }

  changeLogIn = () => {
    if(this.state.isLogin) {
      this.setState({isLogin : false});
    }
    else {
      this.setState({isLogin : true});
    }
  }

  signUp = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, this.state.signUp_email, this.state.signUp_password)
      .then((userCredential) => {
        // Signed up 
        const user = userCredential.user;

        let payload = {
          "userId" : user.uid,
          "userName" : this.signUp_name,
          "email" : this.state.signUp_email,
          "password" : this.state.signUp_password,
          "userImage" : "dummyImage"
        }
        
        fetch('http://localhost:8080/api/v1/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        })
        .then(response => response.json())
        .then(data => {
          this.changeLogIn();
          window.location.reload();
        })
        .catch(error => {
          // Handle error
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(error);
      });
  }  

  signIn = (e) => {
    const thisContext = this;
    e.preventDefault();
    signInWithEmailAndPassword(auth, this.state.signIn_email, this.state.signIn_password)
      .then((userCredential) => {
        // Signed in
        let payload = {
          "email" : this.state.signIn_email,
          "password" : this.state.signIn_password
        }

        fetch('http://localhost:8080/api/v1/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        })
        .then(response => response.json())
        .then(data => {
          console.log(data.accessToken);
          localStorage.setItem("token", JSON.stringify(data.accessToken));
          thisContext.props.updateCurrentUser(data.currentUser);
          window.location.reload();
        })
        .catch(error => {
          // Handle error
        });
        // ...
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(error);
      });
  }

  render() { 
    return (
      <div className="container">
        <Grid container height="1000px">
          <Grid item xs={3} >
      
          </Grid>
          <Grid item xs={6} >
            <div className="loginPage_main">
              <div className="loginPage_leftComponent">
                <img className="loginPage_fbLogo" src="https://static.xx.fbcdn.net/rsrc.php/y1/r/4lCu2zih0ca.svg" width={250}/>
                <div className="loginPage_text">
                  Facebook helps you connect and share with the people in your life
                </div>
              </div>
              <div className="loginPage_rightComponent">
                <Paper className="loginPage_rightComp_Form">
                  <div className="loginPage_Box">
                    <div className="loginPage_signIn">
                      {
                        this.state.isLogin ? 
                        <div>
                          <input onChange={(event) => {this.state.signIn_email = event.currentTarget.value}} className="loginPage_textBoxFirst" type="text" placeholder="Email address"></input>
                          <input onChange={(event) =>{this.state.signIn_password = event.currentTarget.value}} className="loginPage_textBox" type="password" placeholder="Password"></input>
                          <button onClick={this.signIn} className="loginPage_loginBtn" > Log In</button>
                        </div> 
                        : 
                        <div>
                          <input onChange={(event) => {this.state.signUp_name = event.currentTarget.value}} className="loginPage_textBoxFirst" type="text" placeholder="Name"></input>
                          <input onChange={(event) => {this.state.signUp_email = event.currentTarget.value}} className="loginPage_textBox" type="text" placeholder="Email address"></input>
                          <input onChange={(event) => {this.state.signUp_password = event.currentTarget.value}} className="loginPage_textBox" type="password" placeholder="Password"></input>
                          <button onClick={this.signUp} className="loginPage_loginBtn" > Sign Up</button>
                        </div>
                      }
                  
                      <div className="loginPage_signUpOption">
                        {
                          this.state.isLogin ? <div className="loginPage_signIn">
                          <div className= "loginPage_forgotPassword">
                            Forgotten Password?
                          </div>
                            <button className="loginPage_createAccountBtn" onClick={this.changeLogIn} > Create new account</button>
                          </div>
                          :
                          <div className="loginPage_signUp">
                            <div className= "loginPage_alreadyHaveAccount" onClick={this.changeLogIn} >
                              Already have an account?
                            </div>
                          </div>
                        }
                      </div>
                    </div>
                  </div>
                </Paper>
              </div>
            </div>
          </Grid>
          <Grid item xs={3} >
       
          </Grid>
        </Grid>
      </div>
    );
  }
}
 
export default LoginPage;