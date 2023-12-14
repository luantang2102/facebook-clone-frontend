import React, { Component } from 'react';
import "../PersonalPage/PersonalPage.css"
import { Avatar } from '@mui/material';
import plus from "../../images/plus-solid.svg";
import pencil from "../../images/pencil-solid.svg";
import down from "../../images/chevron-down-solid.svg";
import moreDown from "../../images/caret-down-solid.svg";

class PersonalPage extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    activeTab : "Posts"
  }

  handleTabClick = (tabName) => {
    this.setState({activeTab : tabName});
  }

  render() { 
    return (
      <div className="main_container">
        <div className="top_container">
          <div className="pp_container">
            <img src="https://firebasestorage.googleapis.com/v0/b/facebook-clone-87933.appspot.com/o/wallpaperflare.com_wallpaper%20(1).jpg?alt=media&token=69e246a6-3b57-4024-823a-714a926632a1" className="pp_coverImage" />
            <div className="pp_headerContainer">
              <div className="pp_headerContainer_top">
                <div className="pp_userImage_container">
                  <Avatar src="https://scontent.fsgn5-12.fna.fbcdn.net/v/t39.30808-1/399927049_1760513474408864_4532997899325130267_n.jpg?stp=cp6_dst-jpg_p240x240&_nc_cat=103&ccb=1-7&_nc_sid=5740b7&_nc_ohc=zOAJJYAGjPEAX_lnOOI&_nc_ht=scontent.fsgn5-12.fna&oh=00_AfBrVNMcxqhMHWO88jIl6UR74eMaeSm_N9iM_rbO5MtHJQ&oe=657D3C36" sx={{ width: 170, height: 170 }}/>
                </div>
                <div>
                  <div className="pp_userName">Luan</div>
                  <div className="pp_userTotalFriends">1000 friends</div>
                </div>
                <div className="pp_userNickname">(miri)</div>
                <div className="pp_buttonContainer">
                  <label for="add_story" className="pp_firstButton">
                    <img src={plus} className="pp_button_image"/>
                    <div className="pp_firstButton_text">Add to story</div>
                  </label>
                  <input type="button" id="add_story"/>
                  <label for="edit_profile" className="pp_secButton">
                    <img src={pencil} className="pp_button_image"/>
                    <div className="pp_secButton_text">Edit profile</div>
                  </label>
                  <input type="button" id="edit_profile"/>
                  <label for="suggest_friends" className="pp_thirdButton">
                    <img src={down} className="pp_button_image"/>
                  </label>
                  <input type="button" id="suggest_friends"/>
                </div>
              </div>
              <div className="pp_headerContainer_bottom">
                <div className="pp_headerContainer_bottom_content">
                  <div className={`pp_headerContainer_bottom_content_tabs ${this.state.activeTab === 'Posts' ? 'active' : ''}`} onClick={() => this.handleTabClick('Posts')} >Posts</div>
                  <div className={`pp_headerContainer_bottom_content_tabs ${this.state.activeTab === 'About' ? 'active' : ''}`} onClick={() => this.handleTabClick('About')} >About</div>
                  <div className={`pp_headerContainer_bottom_content_tabs ${this.state.activeTab === 'Friends' ? 'active' : ''}`} onClick={() => this.handleTabClick('Friends')} >Friends</div>
                  <div className={`pp_headerContainer_bottom_content_tabs ${this.state.activeTab === 'Photos' ? 'active' : ''}`} onClick={() => this.handleTabClick('Photos')} >Photos</div>
                  <div className={`pp_headerContainer_bottom_content_tabs ${this.state.activeTab === 'Videos' ? 'active' : ''}`} onClick={() => this.handleTabClick('Videos')} >Videos</div>
                  <div className={`pp_headerContainer_bottom_content_tabs ${this.state.activeTab === 'Reels' ? 'active' : ''}`} onClick={() => this.handleTabClick('Reels')} >Reels</div>
                  <div className={`pp_headerContainer_bottom_content_tabs ${this.state.activeTab === 'More' ? 'active' : ''}`} onClick={() => this.handleTabClick('More')} >
                    <div>More</div>
                    <img src={moreDown} className="pp_button_image"/>
                  </div>
                </div> 
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
 
export default PersonalPage;