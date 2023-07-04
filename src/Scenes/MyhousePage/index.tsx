import * as React from 'react';
import './style.css';
import { RouteComponentProps } from 'react-router-dom';
import Dashboard from 'Components/DashboardLayout';
import House from './HouseComponent/House';
import { getSingleListing } from 'Services/Api/Listing/Listing';
import { Listing } from 'Models/Listing';
import currency = require('currency.js');
import LoadingSpinner from 'Components/Spinner/Spinner';
import { AreaCode } from 'Redux/Modules/Criteria';
import { mixed } from 'Models/Unknown';
import Footer from 'Scenes/HomePage/Components/Footer';

export interface listing {
  name: string
  address: string
  beds: number
  toilets: number
  square: number
  price: string
  perSQFT: string
  img: string
  imgs?: string[]
  imgThumb: string
  imgsthumb: string[]
  status: string
  dateUpdated: Date
  mlsId: number
  id: number
  tax?: string
  homeOwnerFee?: string
  county?: string
  city: string
  area: string
  direction?: string
  subdivision?: string
  owner?: string
  phone?: string
  lotDim?: string
  Bdroom1?: string
  Bdroom2?: string
  Bdroom3?: string
  Bdroom4?: string
  Bdroom5?: string
  diningDim?: string
  livingDim?: string
  kitchenDim?: string
  familyDim?: string
  yearBuilt?: string
  pool?: string
  waterfront?: string
  fireplace?: string
  warranty?: string
  internet?: string
  remarks?: string
}

interface ListComponentState {
  listing: listing;
  isLoaded: boolean;
}

class MyhousePage extends React.Component<RouteComponentProps<{ id: string }>, ListComponentState> {

  constructor(props: RouteComponentProps<{ id: string }>) {
    super(props);
    this.state = {
      listing: undefined!,
      isLoaded: false
    };
  }

  componentDidMount(): void {
    getSingleListing(parseInt(this.props.match.params.id)).then((res: Listing) => {
      if (res) {
        const photoArr = res.photos!.split(',')
        const photoThumbArr = res.photosThumb!.split(',')
        const newlisting: listing = {
          name: res.remarks!.substring(0, 70) + '...' || 'No Description Available',
          address: res.address || 'No Address Available',
          beds: res.bdrooms || 0,
          toilets: res.bthrooms || 0,
          square: res.sqft,
          img: '',
          imgs: [],
          imgThumb:'',
          imgsthumb:[],
          price: currency(res.price, { precision: 0 }).format(),
          perSQFT: currency(res.price/res.sqft).format(),
          status: res.status,
          dateUpdated: new Date(res.updatedAt!),
          mlsId: res.mls_id,
          id: res.id,
          tax: res.tax ? currency(res.tax, { precision: 0 }).format() : 'No tax information available',
          homeOwnerFee: res.homeOwnerFee ? currency(res.homeOwnerFee, { precision: 0 }).format() : '$0',
          county: res.county || 'N/A',
          city: res.city || 'N/A',
          area: Object.keys(AreaCode)[Object.values(AreaCode).indexOf(res.area as mixed as AreaCode)],
          direction: res.direction || 'N/A',
          subdivision: res.subdivision || 'N/A',
          owner: res.owner || 'N/A',
          phone: res.phone || 'N/A',
          lotDim: res.lotDim || 'N/A',
          Bdroom1: res.Bdroom1 || 'N/A',
          Bdroom2: res.Bdroom2 || 'N/A',
          Bdroom3: res.Bdroom3 || 'N/A',
          Bdroom4: res.Bdroom4 || 'N/A',
          Bdroom5: res.Bdroom5 || 'N/A',
          diningDim: res.diningDim || 'N/A',
          livingDim: res.livingDim || 'N/A',
          kitchenDim: res.kitchenDim || 'N/A',
          familyDim: res.familyDim || 'N/A',
          yearBuilt: res.yearBuilt || 'N/A',
          pool: res.pool? 'Yes': 'No',
          waterfront: res.pool? 'Yes': 'No',
          fireplace: res.fireplace? 'Yes': 'No',
          warranty: res.warranty? 'Yes': 'No',
          internet: res.internet? 'Yes': 'No',
          remarks: res.remarks || 'N/A',
        }
        newlisting.imgs = []
        newlisting.imgsthumb = []
        photoArr.forEach((res) => { newlisting.imgs!.push('https://tbrmls.paragonrels.com/ParagonLS/Files/ListingPictures/TBRMLS' + res) })
        photoThumbArr.forEach((res) => { newlisting.imgsthumb!.push('https://cdnparap120.paragonrels.com/ParagonImages/Property/p12/TBRMLS' + res) })
        newlisting.img = newlisting.imgs[0]
        newlisting.imgThumb = newlisting.imgsthumb[0]
        console.log(newlisting);
        
        this.setState({ listing: newlisting })
        this.setState({ isLoaded: true })
      }
    })
  }

  renderedElement = () => {
    return (
      this.state.isLoaded ? (
        <Dashboard>
          <div className="wrapper stack gap-8">
            <h3>Property ({this.props.match.params.id})</h3>
          </div>
          <div className="wrapper stack gap-8">
            <House data={this.state.listing} />
          </div>
          <div className="footerWrapper">
            <Footer />
          </div>
        </Dashboard>
      ) : (
        <Dashboard>
          <LoadingSpinner></LoadingSpinner>
        </Dashboard>
      )
    )
  }

  render() {
    return (
      <div className="stack gap-20">
        {this.renderedElement()}
      </div>
    );
  }
}

export default MyhousePage;