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
        "image" : "",
        "text" : "Luân Tăng"
      },
      {
        "image" : "",
        "text" : "Luân Tăng"
      },
      {
        "image" : "",
        "text" : "Luân Tăng"
      },
      {
        "image" : "",
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