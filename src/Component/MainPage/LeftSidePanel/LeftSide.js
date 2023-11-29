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
        "image" : "https://scontent.fsgn5-12.fna.fbcdn.net/v/t39.30808-6/399927049_1760513474408864_4532997899325130267_n.jpg?stp=cp6_dst-jpg&_nc_cat=103&ccb=1-7&_nc_sid=5f2048&_nc_ohc=uAH63iJVwgcAX9LIu8a&_nc_ht=scontent.fsgn5-12.fna&oh=00_AfB8iTjdb7u_QvifQmPNtNFV0588sc7Dyjhpyo3nvo2L8A&oe=6559B3F8",
        "text" : "Luân Tăng"
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