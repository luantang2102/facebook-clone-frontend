import React, { Component } from 'react';
import "./PostContainer.css";
import Post from './Post';

class PostContainer extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    content : []
  }

  getData = () => {
     //Call the REST
    const thisContext = this;
    let token = localStorage.getItem("token").replace(/^"|"$/g, '');
    let auth = "Bearer " + token;
    fetch('https://facebook-clone-backend-production-693b.up.railway.app/api/v1/user/posts', {
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
      thisContext.setState({content : data.content})
    })
    .catch(error => {
      console.log(error);
    });
    // ...
  }

  getIndividualData = () => {
    //Call the REST
   const thisContext = this;
   let token = localStorage.getItem("token").replace(/^"|"$/g, '');
   let auth = "Bearer " + token;
   fetch(`https://facebook-clone-backend-production-693b.up.railway.app/api/v1/user/${this.props.userId}/posts`, {
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
     thisContext.setState({content : data.content})
   })
   .catch(error => {
     console.log(error);
   });
   // ...
 }

  componentDidMount() {
    if(this.props.userId === undefined || this.props.userId === null) {
      this.getData();
    }
    else {
      this.getIndividualData();
    }
  }
  
  render() { 
    return (
      <div>
        {
          this.state.content.map((item) => (
            <Post openPersonalPage={this.props.openPersonalPage} key={item.postId} object={item} update={this.getData} userId={this.props.userId} userName={this.props.userName} userImage={this.props.userImage}/>
          ))
        }
      </div>
    );
  }
}
 
export default PostContainer;