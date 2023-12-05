import React, { Component } from 'react';
import ImageLayout from '../ImageLayout';
import memories from '../../../images/memories.png';
import groups from '../../../images/groups.png';
import ads from '../../../images/ads.png';
import mess from '../../../images/messengerkids.png';
import adManager from '../../../images/admanager.png';
import bloods from '../../../images/blood.png';

class LeftSide extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    data: []
  }

  getData = () => {
    let jsData = [
      {
        "image" : this.props.userImage,
        "text" : this.props.userName
      },
      {
        "image" : groups,
        "text" : "Friends"
      },
      {
        "image" : memories,
        "text" : "Memories"
      },
      {
        "image" : ads,
        "text" : "Ad Centre"
      },
      {
        "image" : mess,
        "text" : "Messenger Kid"
      },
      {
        "image" : adManager,
        "text" : "Ads Manager"
      },
      {
        "image" : bloods,
        "text" : "Blood Donation"
      }
    ]
    this.setState({data: jsData});
  }

  componentDidMount() {
    this.getData();
  }

  render() { 
    return ( 
      <div>
        {
          this.state.data.map((item) => (
            <ImageLayout text={item.text} image={item.image}/>
          ))
        }
      </div>
    );
  }
}
 
export default LeftSide;