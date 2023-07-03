import * as React from 'react';
import './style.css';
import { Link } from 'react-router-dom';

import "react";

declare module "react" {
  interface ImgHTMLAttributes<T> extends HTMLAttributes<T> {
    loading?: "auto" | "eager" | "lazy";
  }
}

interface SingleHouseProps {
  data: any;
}

class SingleHouse extends React.Component<SingleHouseProps, {}> {
  render() {
    return (
      <div className="singleHouse">
        <Link to={`/property/${this.props.data.id}`} className="card">
          <div className="figure">
            <img src={this.props.data.img} alt="image" loading="lazy" />
            <div className="figCaption">
              <div style={{fontSize: '18px'}}>{this.props.data.price}</div>
            </div>
            <div className="figView"><span className="fa fa-hourglass-half" /></div>
            <div
            className="figType"
            style={{
              backgroundColor:
              ['Active','Back on Market','Contingent','Reduce Price','New','Increase Price','First Right of Refusal','Coming Soon'].includes(this.props.data.status)?
              "#228B22":"#8b0000"
            }}
            >{this.props.data.status}</div>
          </div>
          <h2>{this.props.data.name}</h2>
          <div className="cardAddress"><span className="fa fa-address-card fa-lg" />
          &nbsp;&nbsp;&nbsp;{this.props.data.address}
          </div>
          <ul>
            <li><span className="fa fa-bed fa-lg" />&nbsp;&nbsp;{this.props.data.beds} Bedrooms</li>
            <li><span className="fa fa-bath fa-lg" />&nbsp;&nbsp;&nbsp;{this.props.data.toilets} Total Bathrooms</li>
            <li><span className="fa fa-home fa-lg" />&nbsp;&nbsp;&nbsp;{this.props.data.square} Sq Ft</li>
            <li><span className="fa fa-clock-o fa-lg" />&nbsp;&nbsp;&nbsp;Updated At: {this.props.data.dateUpdated.toLocaleString()}</li>
            <li><span className="fa fa-book fa-lg" />&nbsp;&nbsp;&nbsp;Listing ID #: {this.props.data.mlsId}</li>
          </ul>
        </Link>
      </div>
    );
  }
}

export default SingleHouse;