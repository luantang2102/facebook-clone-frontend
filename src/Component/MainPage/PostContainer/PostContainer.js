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
    fetch('http://localhost:8080/api/v1/user/posts', {
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
      console.log(data.content);
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
      <div>
        {
          this.state.content.map((item) => (
            <Post object={item}/>
          ))
        }
      </div>
    );
  }
}
 
export default PostContainer;