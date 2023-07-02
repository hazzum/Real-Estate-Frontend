import * as React from 'react';
import './style.css';
import SingelHouse from 'Components/SingleHouse';
import { getListings } from 'Services/Api/Listing/Listing';
import { Listing } from 'Models/Listing';
import * as currency from 'currency.js'
import { OrderBy } from 'Redux/Modules/Criteria';
import LoadingSpinner from 'Components/Spinner/Spinner';

interface listing {
  name: string
  address: string
  beds: number
  toilets: number
  square: number
  img: string
  imgs?: string[]
  price: string
  status: string
  dateUpdated: Date
  mlsId: number
  id: number
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
    getListings({pageNumber:1, listingStatus:'Active,Back on Market,Reduce Price,New,Increase Price,First Right of Refusal,Coming Soon', sortingBy:OrderBy['Newest']}).then(res => {
      if (res) {
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
            price: currency(ele.price, { precision: 0 }).format(),
            status: ele.status,
            dateUpdated: new Date(ele.updatedAt!),
            mlsId: ele.mls_id,
            id: ele.id
          }
          listing.imgs = []
          photoArr.forEach((ele)=>{listing.imgs!.push('https://cdnparap120.paragonrels.com/ParagonImages/Property/p12/TBRMLS' + ele)})
          listing.img=listing.imgs[0]
          listingsNew.push(listing)
        })
        this.setState({listings:listingsNew})
        this.setState({isLoaded: true})
      }
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
              <div className="col-xs-12 col-sm-6 col-md-4 col-lg-3" key={index}>
                <SingelHouse data={data} />
              </div>
            );
          })}
        </div>
      </div>): (<LoadingSpinner></LoadingSpinner>)
    );
  }
}

export default ListProperty;