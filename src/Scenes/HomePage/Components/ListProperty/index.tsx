import * as React from 'react';
import './style.css';
import SingelHouse from 'Components/SingleHouse';
import { getListings } from 'Services/Api/Listing/Listing';
import { Listing } from 'Models/Listing';
import * as currency from 'currency.js'
import ReactLoading from 'react-loading';

interface listing {
  name: string
  address: string
  beds: number
  toilets: number
  square: number
  img: string
  imgs?: string[]
  price: string
}

interface ListComponentState {
  listings: listing[];
  isLoaded: boolean;
}

class ListProperty extends React.Component<{}, ListComponentState> {
  constructor(props: ListComponentState) {
    super(props);
    this.state = {
      listings: [],
      isLoaded: false
    };
  }
  
  componentDidMount(): void {
    let listingsNew: listing[] = []
    getListings({pageNumber:2}).then(res => {
      if (res.count) {
        res.rows.forEach((ele: Listing) => {
          const photoArr = ele.photosThumb!.split(',')
          const listing: listing = {
            name: ele.remarks!.substring(0, 30) + '...' || 'No Description Available',
            address: ele.address || 'No Address Available',
            beds: ele.bdrooms || 0,
            toilets: ele.bthrooms || 0,
            square: ele.sqft,
            img: '',
            imgs:[],
            price: currency(ele.price).format()
          }
          listing.imgs = []
          photoArr.forEach((ele)=>{listing.imgs!.push('https://cdnparap120.paragonrels.com/ParagonImages/Property/p12/TBRMLS' + ele)})
          listing.img=listing.imgs[0]
          listingsNew.push(listing)
        })
      }
      this.setState({listings:listingsNew})
      this.setState({isLoaded: true})
    })
  }


  render() {
    return (
      this.state.isLoaded?
      (<div className="listProperty">
        <div className="row listPropertyHeader">
          <h3>Recently Listed Properties</h3>
          <h5>Find the most recent listings!</h5>
        </div>
        <div className="row listPropertyContent">
          {this.state.listings.map((data, index) => {
            return (
              <div className="col-xs-6 col-sm-6 col-md-4 col-lg-3" key={index}>
                <SingelHouse data={data} />
              </div>
            );
          })}
        </div>
      </div>): (<ReactLoading type='spokes' height={667} width={375} />)
    );
  }
}

export default ListProperty;