import * as React from 'react';
import './style.css';
import { Link } from 'react-router-dom';

interface SingleHouseProps {
  data: any;
}

class SingleHouse extends React.Component<SingleHouseProps, {}> {
  render() {
    return (
      <div className="singleHouse">
        <Link to={`/property/${this.props.data.id}`} className="card">
          <div className="figure">
            <img src={this.props.data.img} alt="image" />
            <div className="figCaption">
              <div style={{fontSize: '18px'}}>{this.props.data.price}</div>
            </div>
            <div className="figView"><span className="fa fa-hourglass-half" /></div>
            <div className="figType">{this.props.data.status}</div>
          </div>
          <h2>{this.props.data.name}</h2>
          <div className="cardAddress"><span className="fa fa-address-card" />
            {'  '+ this.props.data.address}
          </div>
          <ul>
            <li><span className="fa fa-bed" /> {this.props.data.beds} Bedrooms</li>
            <li><span className="fa fa-bath" /> {this.props.data.toilets} Total Bathrooms</li>
            <li><span className="fa fa-home" /> {this.props.data.square} Sq Ft</li>
            <li><span className="fa fa-clock-o" /> Updated At: {this.props.data.dateUpdated.toLocaleString()}</li>
            <li><span className="fa fa-book" /> Listing ID #: {this.props.data.mlsId}</li>
          </ul>
        </Link>
      </div>
    );
  }
}

export default SingleHouse;