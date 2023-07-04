import * as React from 'react';
import './style.css';
import Carousel from 'react-gallery-carousel';
import 'react-gallery-carousel/dist/index.css';
import { listing } from '..';
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from 'react-accessible-accordion';

import 'react-accessible-accordion/dist/fancy-example.css';


interface HouseProps {
  data: listing;
}

class House extends React.Component<HouseProps, {}> {

  constructor(props: HouseProps) {
    super(props);

  }

  renderImages = () => {
    const { imgs, imgsthumb, address } = this.props.data;
    if (imgsthumb.length > 1 && imgs) {
      const images = imgs.map((ele, index) => ({
        src: ele,
        alt: address,
        thumbnail: imgsthumb[index]
      }))
      return (
        <div>
          <Carousel
            images={images}
            style={{ height: window.innerWidth > 767 ? '62vh' : '43vh' }}
            thumbnailWidth='13%'
            thumbnailHeight='13%'
            hasThumbnails={false}
            hasThumbnailsAtMax={true}
            shouldMinimizeOnClick={true}
            shouldMaximizeOnClick={true}
            canAutoPlay={false}
            hasTransition= {true}
            transitionSpeed={3}
          />
        </div>
      );
    }
    else if (imgsthumb.length == 1) {
      return (
        <div>
          <img src={this.props.data.imgThumb} alt={this.props.data.address} onLoad={() => this.setState({ isLoaded: true })} />
        </div>
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
                  ['Active', 'Back on Market', 'Contingent', 'Reduce Price', 'New', 'Increase Price', 'First Right of Refusal', 'Coming Soon'].includes(this.props.data.status) ?
                    "#228B22" : "#8b0000"
              }}
            >{this.props.data.status}</div>
          </div>
          <div className='Description'>
            <h2>{this.props.data.address}, {this.props.data.area}</h2>
            <hr className="solid" />
          </div>
          <div className="summCard">
            <div className="miniCard">
              <div className="fa fa-home fa-2x"></div>
              <div><b>{this.props.data.square}</b> Sq Ft</div>
            </div>
            <div className="miniCard">
              <div className="fa fa-bed fa-2x"></div>
              <div><b>{this.props.data.beds}</b> Bedrooms</div>
            </div>
            <div className="miniCard">
              <div className="fa fa-bath fa-2x"></div>
              <div><b>{this.props.data.toilets}</b> Bathrooms</div>
            </div>
            <div className="miniCard">
              <div className="fa fa-clock-o fa-2x"></div>
              <div><b>{this.props.data.status}</b></div>
            </div>
          </div>
          <div className='Description'>
            <hr className="solid" />
            <Accordion allowZeroExpanded preExpanded={['a']}>
              <AccordionItem uuid="a">
                <AccordionItemHeading>
                  <AccordionItemButton>
                    <span className="fa fa-search" />  Info
                  </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel className="infoCard">
                  <ul>
                    <li><span className="fa fa-search fa-lg" />&nbsp;&nbsp;&nbsp;Listing ID #:<span className="Tab"></span><b>{this.props.data.mlsId}</b></li>
                    <li><span className="fa fa-clock-o fa-lg" />&nbsp;&nbsp;&nbsp;Updated At:<span className="Tab"></span><b>{this.props.data.dateUpdated.toLocaleString()}</b></li>
                    <li><span className="fa fa-money fa-lg" />&nbsp;&nbsp;Listed Price:<span className="Tab"></span><b>{this.props.data.price}</b></li>
                    <li><span className="fa fa-money fa-lg" />&nbsp;&nbsp;Price per sqft:<span className="Tab"></span><b>{this.props.data.perSQFT}</b></li>
                    <li><span className="fa fa-globe fa-lg" />&nbsp;&nbsp;&nbsp;Area:<span className="Tab"></span><b>{this.props.data.area}</b></li>
                    <li><span className="fa fa-globe fa-lg" />&nbsp;&nbsp;&nbsp;City:<span className="Tab"></span><b>{this.props.data.city.charAt(0).toUpperCase() + this.props.data.city.slice(1).toLowerCase()}</b></li>
                    <li><span className="fa fa-globe fa-lg" />&nbsp;&nbsp;&nbsp;County:<span className="Tab"></span><b>{this.props.data.county}</b></li>
                    <li><span className="fa fa-money fa-lg" />&nbsp;&nbsp;Taxes:<span className="Tab"></span><b>{this.props.data.tax}</b></li>
                    <li><span className="fa fa-history fa-lg" />&nbsp;&nbsp;&nbsp;Year Built:<span className="Tab"></span><b>{this.props.data.yearBuilt}</b></li>
                    <li><span className="fa fa-user fa-lg" />&nbsp;&nbsp;&nbsp;Owner:<span className="Tab"></span><b>{this.props.data.owner}</b></li>
                    <li><span className="fa fa-phone fa-lg" />&nbsp;&nbsp;&nbsp;Owner Number:<span className="Tab"></span><b>{this.props.data.phone}</b></li>
                    <li><span className="fa fa-money fa-lg" />&nbsp;&nbsp;Homeowner Fee:<span className="Tab"></span><b>{this.props.data.homeOwnerFee}</b></li>
                  </ul>
                </AccordionItemPanel>
              </AccordionItem>
              <AccordionItem uuid="b">
                <AccordionItemHeading>
                  <AccordionItemButton>
                    <span className="fa fa-home" />  House Dimensions
                  </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel className="infoCard">
                  <ul>
                    <li><span className="fa fa-home fa-lg" />&nbsp;&nbsp;&nbsp;Lot Dim.:<span className="Tab"></span><b>{this.props.data.lotDim}</b></li>
                    <li><span className="fa fa-bed fa-lg" />&nbsp;&nbsp;Master Bedroom Dim.:<span className="Tab"></span><b>{this.props.data.Bdroom1}</b></li>
                    <li style={{display:this.props.data.beds>1?"block":"none"}}><span className="fa fa-bed fa-lg" />&nbsp;&nbsp;Bedroom #2 Dim.:<span className="Tab"></span><b>{this.props.data.Bdroom2}</b></li>
                    <li style={{display:this.props.data.beds>2?"block":"none"}}><span className="fa fa-bed fa-lg" />&nbsp;&nbsp;Bedroom #3 Dim.:<span className="Tab"></span><b>{this.props.data.Bdroom3}</b></li>
                    <li style={{display:this.props.data.beds>3?"block":"none"}}><span className="fa fa-bed fa-lg" />&nbsp;&nbsp;Bedroom #4 Dim.:<span className="Tab"></span><b>{this.props.data.Bdroom4}</b></li>
                    <li style={{display:this.props.data.beds>4?"block":"none"}}><span className="fa fa-bed fa-lg" />&nbsp;&nbsp;Bedroom #5 Dim.:<span className="Tab"></span><b>{this.props.data.Bdroom5}</b></li>
                    <li><span className="fa fa-home fa-lg" />&nbsp;&nbsp;&nbsp;Dining Room Dim.:<span className="Tab"></span><b>{this.props.data.diningDim}</b></li>
                    <li><span className="fa fa-home fa-lg" />&nbsp;&nbsp;&nbsp;Living Room Dim.:<span className="Tab"></span><b>{this.props.data.livingDim}</b></li>
                    <li><span className="fa fa-home fa-lg" />&nbsp;&nbsp;&nbsp;Family Room Dim.:<span className="Tab"></span><b>{this.props.data.familyDim}</b></li>
                    <li><span className="fa fa-home fa-lg" />&nbsp;&nbsp;&nbsp;Kitchen Dim.:<span className="Tab"></span><b>{this.props.data.kitchenDim}</b></li>
                  </ul>
                </AccordionItemPanel>
              </AccordionItem>
              <AccordionItem uuid="c">
                <AccordionItemHeading>
                  <AccordionItemButton>
                    <span className="fa fa-wifi" />  House Features
                  </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel className="infoCard">
                  <ul>
                    <li><span className="fa fa-life-ring fa-lg" />&nbsp;&nbsp;&nbsp;Pool:<span className="Tab"></span><b>{this.props.data.pool}</b></li>
                    <li><span className="fa fa-ship fa-lg" />&nbsp;&nbsp;Waterfront:<span className="Tab"></span><b>{this.props.data.waterfront}</b></li>
                    <li><span className="fa fa-fire fa-lg" />&nbsp;&nbsp;&nbsp;&nbsp;Fireplace:<span className="Tab"></span><b>{this.props.data.fireplace}</b></li>
                    <li><span className="fa fa-wifi fa-lg" />&nbsp;&nbsp;Internet:<span className="Tab"></span><b>{this.props.data.internet}</b></li>
                    <li><span className="fa fa-home fa-lg" />&nbsp;&nbsp;&nbsp;Warranty:<span className="Tab"></span><b>{this.props.data.warranty}</b></li>
                  </ul>
                </AccordionItemPanel>
              </AccordionItem>
              <AccordionItem uuid="d">
                <AccordionItemHeading>
                  <AccordionItemButton>
                    <span className="fa fa-globe" />  Directions
                  </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                  <p><b>{this.props.data.direction}</b></p>
                </AccordionItemPanel>
              </AccordionItem>
              <AccordionItem uuid="e">
                <AccordionItemHeading>
                  <AccordionItemButton>
                    <span className="fa fa-weixin" />  Owner's Description
                  </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                  <p style={{ marginLeft: 13 }}><b>{this.props.data.remarks}</b></p>
                </AccordionItemPanel>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>
    );
  }
}

export default House;