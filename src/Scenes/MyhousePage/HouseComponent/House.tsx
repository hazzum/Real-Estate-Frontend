import * as React from 'react';
import './style.css';
import ImageGallery from 'react-image-gallery';
import { listing } from '..';

interface HouseProps {
  data: listing;
}

class House extends React.Component<HouseProps, {}> {

  renderImages = () =>{
    let images: Array<{original: string, thumnail:string}> = []
    const {imgs, imgsthumb} = this.props.data;
    console.log('hiii');
    
    if(imgsthumb.length>1 && imgs) {
      console.log('entered llopp 2');
      imgsthumb.forEach((ele, index)=>{
        images.push({original:imgs[index], thumnail:ele})
      })
      return (<ImageGallery infinite={false} lazyLoad={true} items={images} />);
 
    }
    else if (imgsthumb.length==1) {
      console.log('entered llopp 1');
      return (<img src={this.props.data.imgThumb} alt="image" />)
    }
    else {console.log('entered llopp 3');return (<img src="/bg-1.jpg" alt="image" />)}
  }

  render() {
    return (
      <div className="House">
        <div className="newCard">
          <div className="newFigure">
            {this.renderImages()}
            <div className="Caption">
              <div style={{ fontSize: '18px' }}>{this.props.data.price}</div>
            </div>
            <div className="View"><span /></div>
            <div className="status">{this.props.data.status}</div>
          </div>
          <h2>{this.props.data.address}, {this.props.data.area}</h2>
          <div className='Description'>
            <p><b>{this.props.data.remarks}</b></p>
          </div>
          <div className='infoCard'>
            <ul>
              <li><span className="fa fa-home" /> Area:  <b>{this.props.data.square}</b> Sq Ft</li>
              <li><span className="fa fa-bed" /> Bedrooms:  <b>{this.props.data.beds}</b></li>
              <li><span className="fa fa-bath" /> Total Bathrooms:  <b>{this.props.data.toilets}</b></li>
              <li><span className="fa fa-clock-o" /> Status:<span className="Tab"></span><b>{this.props.data.status}</b></li>
              <li><span className="fa fa-money" /> Listed Price:<span className="Tab"></span><b>{this.props.data.price}</b></li>
              <li><span className="fa fa-home" /> Lot Dim.:<span className="Tab"></span><b>{this.props.data.lotDim}</b></li>
              <li><span className="fa fa-bed" /> Master Bedroom Dim.:<span className="Tab"></span><b>{this.props.data.Bdroom1}</b></li>
              <li><span className="fa fa-bed" /> Bedroom #2 Dim.:<span className="Tab"></span><b>{this.props.data.Bdroom2}</b></li>
              <li><span className="fa fa-bed" /> Bedroom #3 Dim.:<span className="Tab"></span><b>{this.props.data.Bdroom3}</b></li>
              <li><span className="fa fa-bed" /> Bedroom #4 Dim.:<span className="Tab"></span><b>{this.props.data.Bdroom4}</b></li>
              <li><span className="fa fa-bed" /> Bedroom #5 Dim.:<span className="Tab"></span><b>{this.props.data.Bdroom5}</b></li>
              <li><span className="fa fa-life-ring" /> Pool:<span className="Tab"></span><b>{this.props.data.pool}</b></li>
              <li><span className="fa fa-ship" /> Waterfront:<span className="Tab"></span><b>{this.props.data.waterfront}</b></li>
              <li><span className="fa fa-wifi" /> Internet:<span className="Tab"></span><b>{this.props.data.internet}</b></li>
            </ul>
            <ul>
              <li><span className="fa fa-clock-o" /> Updated At:<span className="Tab"></span><b>{this.props.data.dateUpdated.toLocaleString()}</b></li>
              <li><span className="fa fa-search" /> Listing ID #:<span className="Tab"></span><b>{this.props.data.mlsId}</b></li>
              <li><span className="fa fa-user" /> Owner:<span className="Tab"></span><b>{this.props.data.owner}</b></li>
              <li><span className="fa fa-phone" /> Owner Number:<span className="Tab"></span><b>{this.props.data.phone}</b></li>
              <li><span className="fa fa-money" /> Taxes:<span className="Tab"></span><b>{this.props.data.tax}</b></li>
              <li><span className="fa fa-money" /> Homeowner Fee:<span className="Tab"></span><b>{this.props.data.homeOwnerFee}</b></li>
              <li><span className="fa fa-globe" /> Subdivision:<span className="Tab"></span><b>{this.props.data.subdivision}</b></li>
              <li><span className="fa fa-home" /> Dining Room Dim.:<span className="Tab"></span><b>{this.props.data.diningDim}</b></li>
              <li><span className="fa fa-home" /> Living Room Dim.:<span className="Tab"></span><b>{this.props.data.livingDim}</b></li>
              <li><span className="fa fa-home" /> Family Room Dim.:<span className="Tab"></span><b>{this.props.data.familyDim}</b></li>
              <li><span className="fa fa-home" /> Kitchen Dim.:<span className="Tab"></span><b>{this.props.data.kitchenDim}</b></li>
              <li><span className="fa fa-home" /> Warranty:<span className="Tab"></span><b>{this.props.data.warranty}</b></li>
              <li><span className="fa fa-fire" /> Fireplace:<span className="Tab"></span><b>{this.props.data.fireplace}</b></li>
              <li><span className="fa fa-history" /> Year Built:<span className="Tab"></span><b>{this.props.data.yearBuilt}</b></li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default House;