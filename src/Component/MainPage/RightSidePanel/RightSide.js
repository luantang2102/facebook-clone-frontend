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
    let jsData = [
      {
        "image" : "https://scontent.fsgn5-12.fna.fbcdn.net/v/t39.30808-6/399927049_1760513474408864_4532997899325130267_n.jpg?stp=cp6_dst-jpg&_nc_cat=103&ccb=1-7&_nc_sid=5f2048&_nc_ohc=uAH63iJVwgcAX9LIu8a&_nc_ht=scontent.fsgn5-12.fna&oh=00_AfB8iTjdb7u_QvifQmPNtNFV0588sc7Dyjhpyo3nvo2L8A&oe=6559B3F8",
        "text" : "Luân Tăng"
      },
      {
        "image" : "https://scontent.fsgn5-12.fna.fbcdn.net/v/t39.30808-6/399927049_1760513474408864_4532997899325130267_n.jpg?stp=cp6_dst-jpg&_nc_cat=103&ccb=1-7&_nc_sid=5f2048&_nc_ohc=uAH63iJVwgcAX9LIu8a&_nc_ht=scontent.fsgn5-12.fna&oh=00_AfB8iTjdb7u_QvifQmPNtNFV0588sc7Dyjhpyo3nvo2L8A&oe=6559B3F8",
        "text" : "Luân Tăng"
      },
      {
        "image" : "https://scontent.fsgn5-12.fna.fbcdn.net/v/t39.30808-6/399927049_1760513474408864_4532997899325130267_n.jpg?stp=cp6_dst-jpg&_nc_cat=103&ccb=1-7&_nc_sid=5f2048&_nc_ohc=uAH63iJVwgcAX9LIu8a&_nc_ht=scontent.fsgn5-12.fna&oh=00_AfB8iTjdb7u_QvifQmPNtNFV0588sc7Dyjhpyo3nvo2L8A&oe=6559B3F8",
        "text" : "Luân Tăng"
      },
      {
        "image" : "https://scontent.fsgn5-12.fna.fbcdn.net/v/t39.30808-6/399927049_1760513474408864_4532997899325130267_n.jpg?stp=cp6_dst-jpg&_nc_cat=103&ccb=1-7&_nc_sid=5f2048&_nc_ohc=uAH63iJVwgcAX9LIu8a&_nc_ht=scontent.fsgn5-12.fna&oh=00_AfB8iTjdb7u_QvifQmPNtNFV0588sc7Dyjhpyo3nvo2L8A&oe=6559B3F8",
        "text" : "Luân Tăng"
      },
      {
        "image" : "https://scontent.fsgn5-12.fna.fbcdn.net/v/t39.30808-6/399927049_1760513474408864_4532997899325130267_n.jpg?stp=cp6_dst-jpg&_nc_cat=103&ccb=1-7&_nc_sid=5f2048&_nc_ohc=uAH63iJVwgcAX9LIu8a&_nc_ht=scontent.fsgn5-12.fna&oh=00_AfB8iTjdb7u_QvifQmPNtNFV0588sc7Dyjhpyo3nvo2L8A&oe=6559B3F8",
        "text" : "Luân Tăng"
      }
    ]
    this.setState({data: jsData});
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
            <ImageLayout text={item.text} image={item.image}/>
          ))
        }
          </div>
        </div>
      </div>
      
    );
  }
}
 
export default RightSide;