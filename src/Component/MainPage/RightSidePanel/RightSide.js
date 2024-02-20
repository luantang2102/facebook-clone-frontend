import React, { Component } from 'react';
import ImageLayout from '../ImageLayout';
import "./RightSide.css"

class RightSide extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    data: []
  }

  getData = () => {
    const thisContext = this;
    let token = localStorage.getItem("token").replace(/^"|"$/g, '');
    let auth = "Bearer " + token;
    fetch(`https://facebook-clone-backend-production-693b.up.railway.app/api/v1/user/current/friends`, {
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
      this.setState({
        data: data
      });
    })
    .catch(error => {
      console.log(error);
    });
  }

  componentDidMount() {
    this.getData();
  }
  
  render() { 
    return (
      <div className="rightSide_container">
        <div className="rightSide_header">
          Contact
        </div>
        <div className="rightSide_content">
          <div>
          {
          this.state.data.map((item) => (
            <ImageLayout text={item.userName} image={item.userImage} openPersonalPage={this.props.openPersonalPage} userId={item.userId}/>
          ))
        }
          </div>
        </div>
      </div>
      
    );
  }
}
 
export default RightSide;