import * as React from 'react';
import './style.css';
import Slider from 'react-animated-slider';
import 'react-animated-slider/build/horizontal.css';

interface SingleHouseProps {
  data: any;
}

class SingleHouse extends React.Component<SingleHouseProps, {}> {
  // slide = this.props.data.imgs.map((ele, index) => {
  //   return (
  //     <div key={index}>
  //       <img src={ele} alt="image" />
  //     </div>
  //   )
  // })
  render() {
    return (
      <div className="singleHouse">
        <a href="#" className="card">
          <div className="figure">
            {/* <Slider>{this.slide}</Slider> */}
            <img src={this.props.data.img} alt="image" />
            <div className="figCaption">
              <div>{this.props.data.price}</div>
            </div>
            <div className="figView"><span className="icon-eye" /></div>
            <div className="figType">FOR SALE</div>
          </div>
          <h2>{this.props.data.name}</h2>
          <div className="cardAddress"><span className="icon-pointer" />
            {this.props.data.address}
          </div>
          <ul>
            <li><span className="fa fa-moon-o" /> {this.props.data.beds}</li>
            <li><span className="icon-drop" /> {this.props.data.toilets}</li>
            <li><span className="icon-frame" /> {this.props.data.square} Sq Ft</li>
          </ul>
        </a>
      </div>
    );
  }
}

export default SingleHouse;