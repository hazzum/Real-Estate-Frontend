import * as React from 'react';
import './style.css';
import ImageGallery from 'react-image-gallery';
import { listing } from '..';
import LoadingSpinner from 'Components/Spinner/Spinner';


interface HouseProps {
  data: listing;
}

interface HouseState {
  isLoaded: boolean;
}

class House extends React.Component<HouseProps, HouseState> {

  constructor(props: HouseProps) {
    super(props);
    this.state = {
      isLoaded: false
    };
  }

  renderImages = () => {
    let images: Array<ImageGallery.items> = []
    const { imgs, imgsthumb, address } = this.props.data;
    if (imgsthumb.length > 1 && imgs) {
      imgsthumb.forEach((ele, index) => {
        images.push({
          original: imgs[index],
          thumbnail: ele,
          thumbnailLoading: "eager",
          loading: index == 0 ? "eager" : "lazy",
          originalTitle: address,
          thumbnailTitle: address,
          originalAlt: address,
          thumbnailAlt: address
        })
      })
      return (
        <>
          <div style={{ display: this.state.isLoaded ? "none" : "block" }}>
            <LoadingSpinner></LoadingSpinner>
          </div>
          <div style={{ display: this.state.isLoaded ? "block" : "none" }}>
            <ImageGallery
              onImageLoad={() => this.setState({ isLoaded: true })}
              onErrorImageURL="/No_Image_Available.jpg"
              lazyLoad={true}
              items={images}
              showPlayButton={false}
              showIndex={true}
              thumbnailPosition={window.innerWidth<767?'bottom':'right'}
            />
          </div>
        </>
      );
    }
    else if (imgsthumb.length == 1) {
      return (
        <>
          <div style={{ display: this.state.isLoaded ? "none" : "block" }}>
            <LoadingSpinner></LoadingSpinner>
          </div>
          <div style={{ display: this.state.isLoaded ? "block" : "none" }}>
            <img src={this.props.data.imgThumb} alt={this.props.data.address} onLoad={() => this.setState({ isLoaded: true })} />
          </div>
        </>
      )
    }
    else { return (<img src="/No_Image_Available.jpg" alt="Not available" />) }
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
            <div
            className="status"
            style={{
              backgroundColor:
              ['Active','Back on Market','Contingent','Reduce Price','New','Increase Price','First Right of Refusal','Coming Soon'].includes(this.props.data.status)?
              "#228B22":"#8b0000"
            }}
            >{this.props.data.status}</div>
          </div>
          <h2>{this.props.data.address}, {this.props.data.area}</h2>
          <div className='Description'>
            <p><span className="fa fa-globe" /> Directions:  <b>{this.props.data.direction}</b></p>
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
              <li><span className="fa fa-fire" /> Fireplace:<span className="Tab"></span><b>{this.props.data.fireplace}</b></li>
              <li><span className="fa fa-wifi" /> Internet:<span className="Tab"></span><b>{this.props.data.internet}</b></li>
            </ul>
            <ul>
              <li><span className="fa fa-clock-o" /> Updated At:<span className="Tab"></span><b>{this.props.data.dateUpdated.toLocaleString()}</b></li>
              <li><span className="fa fa-search" /> Listing ID #:<span className="Tab"></span><b>{this.props.data.mlsId}</b></li>
              <li><span className="fa fa-user" /> Owner:<span className="Tab"></span><b>{this.props.data.owner}</b></li>
              <li><span className="fa fa-phone" /> Owner Number:<span className="Tab"></span><b>{this.props.data.phone}</b></li>
              <li><span className="fa fa-money" /> Taxes:<span className="Tab"></span><b>{this.props.data.tax}</b></li>
              <li><span className="fa fa-money" /> Homeowner Fee:<span className="Tab"></span><b>{this.props.data.homeOwnerFee}</b></li>
              <li><span className="fa fa-globe" /> Area:<span className="Tab"></span><b>{this.props.data.area}</b></li>
              <li><span className="fa fa-globe" /> County:<span className="Tab"></span><b>{this.props.data.county}</b></li>
              <li><span className="fa fa-globe" /> City:<span className="Tab"></span><b>{this.props.data.city.charAt(0).toUpperCase() + this.props.data.city.slice(1).toLowerCase()}</b></li>
              <li><span className="fa fa-home" /> Dining Room Dim.:<span className="Tab"></span><b>{this.props.data.diningDim}</b></li>
              <li><span className="fa fa-home" /> Living Room Dim.:<span className="Tab"></span><b>{this.props.data.livingDim}</b></li>
              <li><span className="fa fa-home" /> Family Room Dim.:<span className="Tab"></span><b>{this.props.data.familyDim}</b></li>
              <li><span className="fa fa-home" /> Kitchen Dim.:<span className="Tab"></span><b>{this.props.data.kitchenDim}</b></li>
              <li><span className="fa fa-home" /> Warranty:<span className="Tab"></span><b>{this.props.data.warranty}</b></li>
              <li><span className="fa fa-history" /> Year Built:<span className="Tab"></span><b>{this.props.data.yearBuilt}</b></li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default House;