import { Avatar, Paper } from '@mui/material';
import React, { Component } from 'react';
import like from "../../../images/like.png"
import likeButton from "../../../images/thumbs-up.svg"
import likedButton from "../../../images/thumbs-up-solid.svg"
import shareButton from "../../../images/share-solid.svg"
import commentButton from "../../../images/comment.svg"

class Post extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    newComment : null,

    //Data
    comment_data : [],
    isLiked : false
  }

  isImageAvailable = (data) => {
    return data === "" ? false : true;
  }

  getComments = () => {
    const thisContext = this;
    let token = localStorage.getItem("token").replace(/^"|"$/g, '');
    let auth = "Bearer " + token;
    fetch(`http://localhost:8080/api/v1/user/comments/${this.props.object.postId}`, {
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
      thisContext.setState({comment_data : data});
    })
    .catch(error => {
      console.log(error);
    });
    // ...
  }

  checkIfLiked = () => {
    const thisContext = this;
    let token = localStorage.getItem("token").replace(/^"|"$/g, '');
    let auth = "Bearer " + token;

    fetch(`http://localhost:8080/api/v1/user/post/${thisContext.props.object.postId}/likes/isLiked`, {
          method: 'GET',
          headers: {
            'Authorization': auth,
            'Content-Type': 'application/json'
          }
        })
        .then(response => response.json())
        .then(data => {
          thisContext.setState({isLiked : data});
        })
        .catch(error => {
          console.log(error);
        });
  }

  componentDidMount() {
    this.getComments();
    this.checkIfLiked();
  }

  handleKeyPress = (event) => {
    const thisContext = this;
    if (event.key === 'Enter') {
      if(thisContext.state.newComment!==null) {
        let token = localStorage.getItem("token").replace(/^"|"$/g, '');
        let auth = "Bearer " + token;
        console.log(auth);

        let payload = {
          "postId" : thisContext.props.object.postId,
          "comment" : thisContext.state.newComment
        }

        fetch('http://localhost:8080/api/v1/user/comment/create', {
          method: 'POST',
          headers: {
            'Authorization': auth,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload),
        })
        .then(response => response.json())
        .then(data => {
          thisContext.getComments();
          thisContext.setState({newComment: '' });
        })
        .catch(error => {
          console.log(error);
        });

      }
    }
  }

  handleLikeButton = () => {
    const thisContext = this;
    const reverse = !this.state.isLiked;
    if(this.state.isLiked) {
      let token = localStorage.getItem("token").replace(/^"|"$/g, '');
      let auth = "Bearer " + token;

      fetch(`http://localhost:8080/api/v1/user/post/${this.props.object.postId}/update/likes/remove`, {
        method: 'PUT',
        headers: {
          'Authorization': auth,
          'Content-Type': 'application/json'
        }
      })
      .then(response => response.json())
      .then(data => {
        thisContext.props.update();
        thisContext.setState({isLiked : reverse});
      })
      .catch(error => {
        console.log(error);
      });
    }
    else {
      let token = localStorage.getItem("token").replace(/^"|"$/g, '');
      let auth = "Bearer " + token;

      fetch(`http://localhost:8080/api/v1/user/post/${this.props.object.postId}/update/likes/add`, {
        method: 'PUT',
        headers: {
          'Authorization': auth,
          'Content-Type': 'application/json'
        }
      })
      .then(response => response.json())
      .then(data => {
        thisContext.props.update();
        thisContext.setState({isLiked : reverse});
      })
      .catch(error => {
        console.log(error);
      });
    }
  }

  handleOpenPersonalPage = () => {
    this.props.openPersonalPage(this.props.object.userId);
  }

  render() { 
    return (
      <div>
        <Paper className="post_container">
          {/* header */}
          <div className="post_header">
            <id className="post_header_img">
              <Avatar src={this.props.object.imageURL} onClick={this.handleOpenPersonalPage}/>
            </id>
            <div className="post_header_text">
              {this.props.object.userName}
            </div>
          </div>
          {/* description */}
          <div className="post_description">
            {this.props.object.description}
          </div>
          {/* image */}
          <div className="post_image">
            {
              this.isImageAvailable(this.props.object.postImgURL) ? <img src={this.props.object.postImgURL} width="600px"/> : <span></span>
            }
          </div>
          {/* like count */}
          <div className="post_likeCountContainer"> 
            <div className="post_like">
              <img className="post_like_img" src={like} />
            </div>
            <div className='post_likeCount'>
            {
              this.state.isLiked ? 
                (this.props.object.likes - 1 >  0 ? `You and ${this.props.object.likes - 1} others` : "You" )
                :
                this.props.object.likes
            }
            </div>
          </div>
          {/* like share box */}
          <div className="post_likeShare">     
            {
              this.state.isLiked ?
              <div className="post_tabs">
                <label for={this.props.object.postId} className="post_tabs">
                  <div className="post_tabFirst">
                    <img className="post_tabFirst_img_liked" src={likedButton} />
                  </div>
                  <div className="post_tabText_liked">
                    Like
                  </div>
                </label>
                <input type="button" id={this.props.object.postId} onClick={this.handleLikeButton} />
              </div>
              :
              <div className="post_tabs">
                <label for={this.props.object.postId} className="post_tabs">
                  <div className="post_tabFirst">
                    <img className="post_tabFirst_img" src={likeButton} />
                  </div>
                  <div className="post_tabText">
                    Like
                  </div>
                </label>
                <input type="button" id={this.props.object.postId} onClick={this.handleLikeButton} />
              </div>
            }  
            <div className="post_tabs">
              <div className="post_tabFirst">
                <img className="post_tabFirst_img" src={commentButton} />
              </div>
              <div className="post_tabText">
                Comment
              </div>
            </div>
            <div className="post_tabs">
              <div className="post_tabFirst">
                <img className="post_tabFirst_img" src={shareButton} />
              </div>
              <div className="post_tabText">
                Share
              </div>
            </div>    
          </div>
          {/* comment box */}
          <div className="post_upload">
            <div>
              {
                this.state.comment_data.map((item) => (
                  <div className="post_comment">
                    <Avatar src={item.imageURL} />
                    <div className="post_comment_textArea">
                      <div className="post_comment_text_username">{item.userName} </div>
                      <div className="post_comment_text_description">{item.comment} </div>
                    </div>
                  </div>
                ))
              } 
            </div>
            <div className="upload_top">
              <div>
                <Avatar className="upload_img" src={this.props.userImage} />
              </div>
              <div>
                <input className="upload_box" placeholder="Write a public comment...." type="text" value={this.state.newComment || ''} onChange={(event) => {this.setState({newComment : event.currentTarget.value})}} onKeyDown={this.handleKeyPress}/>
              </div>
            </div>
          </div>
        </Paper>
      </div>
    );
  }
}
 
export default Post;