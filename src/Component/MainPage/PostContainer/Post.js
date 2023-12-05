import { Avatar, Paper } from '@mui/material';
import React, { Component } from 'react';
import post from "../../../images/post.jpeg"
import like from "../../../images/like.png"
import likeButton from "../../../images/likebutton.png"
import shareButton from "../../../images/share.png"
import commentButton from "../../../images/comment.png"

class Post extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    newComment : ""
    
  }

  isImageAvailable = (data) => {
    return data === "" ? false : true;
  }

  handleKeyPress = (event) => {
    const thisContext = this;
    if (event.key === 'Enter') {


    }
  }

  render() { 
    return (
      <div>
        <Paper className="post_container">
          {/* header */}
          <div className="post_header">
            <div className="post_header_img">
              <Avatar src={this.props.object.imageURL}/>
            </div>
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
            {this.props.object.likes}
            </div>
          </div>
          {/* like share box */}
          <div className="post_likeShare">
            <div className="post_tabs">
              <div className="post_tabFirst">
                <img className="post_tabFirst_img" src={likeButton} />
              </div>
              <div className="post_tabText">
                Like
              </div>
            </div>
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
              {} 
            </div>
            <div className="upload_top">
              <div>
                <Avatar className="upload_img" src={this.props.object.imageURL} />
              </div>
              <div>
                <input className="upload_box" placeholder="Write a public comment...." type="text" onChange={(event) => {this.state.newComment = event.currentTarget.value}} onKeyDown={this.handleKeyPress}/>
              </div>
            </div>
          </div>
        </Paper>
      </div>
    );
  }
}
 
export default Post;