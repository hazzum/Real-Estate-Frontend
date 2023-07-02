import * as React from 'react';
import './style.css';
import SelectComponent from 'Components/SelectComponent';
import SingelHouse from 'Components/SingleHouse';
// import SearchMap from '../SearchMap';
import { Listing } from 'Models/Listing';
import { CriteriaState, OrderBy, OrderDir, changeState } from 'Redux/Modules/Criteria';
import { getListings } from 'Services/Api/Listing/Listing';
import currency = require('currency.js');
import LoadingSpinner from 'Components/Spinner/Spinner';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import * as _ from "lodash";
import ReactPaginate from 'react-paginate';
import { Link } from 'react-router-dom';

const mapStateToProps = (state: any) => ({
  payload: state.criteria
});

const mapDispatchToProps = (dispatch: Dispatch<{}>) => ({
  changeState: (payload: Partial<CriteriaState>) => {
    dispatch(changeState(payload));
  }
});

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

interface SearchFormState {
  listings: listing[];
  recordCount: number;
  resultTab: 'list';
  isLoaded: boolean;
}

interface SearchBarProps {
  payload: Partial<CriteriaState>;
  changeState: (payload: Partial<CriteriaState>) => void;
}

class SearchForm extends React.Component<SearchBarProps, SearchFormState> {
  constructor() {
    super();
    this.state = {
      resultTab: 'list',
      listings: [],
      isLoaded: false,
      recordCount: 0
    };
  }

  componentDidMount(): void {
    this.setState({ isLoaded: false })
    let listingsNew: listing[] = []
    getListings({
      pageNumber: 1,
      listingStatus: 'Active,Back on Market,Reduce Price,New,Increase Price,First Right of Refusal,Coming Soon',
      sortingBy: OrderBy['Newest'],
      ...this.props.payload
    }).then(res => {
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
            imgs: [],
            price: currency(ele.price, { precision: 0 }).format(),
            status: ele.status,
            dateUpdated: new Date(ele.updatedAt!),
            mlsId: ele.mls_id,
            id: ele.id
          }
          listing.imgs = []
          photoArr.forEach((ele) => { listing.imgs!.push('https://cdnparap120.paragonrels.com/ParagonImages/Property/p12/TBRMLS' + ele) })
          listing.img = listing.imgs[0]
          listingsNew.push(listing)
        })
      }
      this.setState({ recordCount: res.count })
      this.setState({ listings: listingsNew })
      this.setState({ isLoaded: true })
    })
  }

  componentDidUpdate(prevProps) {
    if (!_.isEqual(prevProps.payload, this.props.payload)) {
      this.componentDidMount();
    }
  }

  handleSortBy = (sortByValue: string) => {
    this.props.changeState({ sortingBy: OrderBy[sortByValue] });
  }

  handleSortDir = (sortDir: OrderDir) => {
    this.props.changeState({ direction: sortDir });
  }

  handlePageSize = (pageSizeStr: string) => {
    const pageS = parseInt(pageSizeStr)
    this.props.changeState({ pageSize: pageS });
  }

  handlePageClick = (event) => {
    this.props.changeState({ pageNumber: event.selected+1 })
  }

  changeResultTab = (tab: 'list') => {
    if (tab !== this.state.resultTab) {
      this.setState({
        resultTab: tab
      });
    }
  }
  resultList = () => {
    return (this.state.isLoaded ?
      (
        this.state.listings.length ? (
          <div className="resultsList">
            <ReactPaginate
              forcePage={this.props.payload.pageNumber!-1}
              onPageChange={this.handlePageClick}
              pageCount={Math.ceil(this.state.recordCount / this.props.payload.pageSize!)}
              renderOnZeroPageCount={null}
              marginPagesDisplayed={2}
              pageRangeDisplayed={1}
              breakLabel="..."
              activeClassName={'page-item active'}
              breakClassName={'page-item disabled'}
              containerClassName={'pagination'}
              disabledClassName={'page-item disabled'}
              nextClassName={"page-item page-link"}
              pageClassName={'page-item page-link'}
              previousClassName={"page-item page-link"}
              previousLabel={<i className="fa fa-arrow-left" aria-hidden="true"></i>}
              nextLabel={<i className="fa fa-arrow-right" aria-hidden="true"></i>}
            />
            <div className="row">
              {this.state.listings.map((data, index) => {
                return (
                  <div className="col-xs-12 col-sm-6 col-md-4 col-lg-4" key={index}>
                    <SingelHouse data={data} />
                  </div>
                );
              })}
            </div>
          </div>
        ) : (<h1>No Results Found</h1>)
      ) : (<LoadingSpinner />)
    );
  }
  // resultMap = () => {
  //   return (
  //     <div className="resultsMap">
  //       <SearchMap />
  //     </div>
  //   );
  // }
  render() {
    return (
      <div className="searchForm">
        <div className="filterBox">
          {/* <div className="row form-group">
            <div className="col-xs-12 col-sm-8 col-md-6 yearOfBirth">
              <h4>Prototype Type</h4>
              <div className="selectItem">
                <SelectComponent selected={undefined} onSelect={() => { return; }} listItem={['All', 'Rent', 'Sale']} />
              </div>
            </div>
          </div> */}
          <div className="row form-group">
            <div className="col-xs-12 col-sm-8 col-md-6 yearOfBirth">
              <h4>Sort By</h4>
              <div className="selectItem">
                <SelectComponent
                  selected={Object.keys(OrderBy)[Object.values(OrderBy).indexOf(this.props.payload.sortingBy!)]}
                  onSelect={this.handleSortBy}
                  listItem={Object.keys(OrderBy)}
                />
              </div>
            </div>
          </div>
          <div className="row form-group">
            <div className="col-xs-12 col-sm-8 col-md-6 yearOfBirth">
              <h4>Asc/Desc</h4>
              <div className="selectItem">
                <SelectComponent selected={this.props.payload.direction} onSelect={this.handleSortDir} listItem={Object.values(OrderDir)} />
              </div>
            </div>
          </div>
          <div className="row form-group">
            <div className="col-xs-12 col-sm-8 col-md-6 yearOfBirth">
              <h4>Listings Per Page</h4>
              <div className="selectItem">
                <SelectComponent
                  selected={this.props.payload.pageSize}
                  onSelect={this.handlePageSize}
                  listItem={Array.from({ length: 31 }, (value, index) => (index + 10).toString())} />
              </div>
            </div>
          </div>
          {/* <div className="row form-group">
            <div className="col-xs-6 col-sm-6 col-md-3 col-lg-3 formItem">
              <div className="formField">
                <label>Bedrooms</label>
                <div className="volume">
                  <a href="#" className="btn btn-gray btn-round-left">
                    <Icon name="angle-left" />
                  </a>
                  <input type="text" className="form-control" readOnly={true} value="1" />
                  <a href="#" className="btn btn-gray btn-round-right">
                    <Icon name="angle-right" />
                  </a>
                </div>
              </div>
            </div>
            <div className="col-xs-6 col-sm-6 col-md-3 col-lg-3 formItem">
              <div className="formField">
                <label>Bathrooms</label>
                <div className="volume">
                  <a href="#" className="btn btn-gray btn-round-left"><Icon name="angle-left" /></a>
                  <input type="text" className="form-control" readOnly={true} value="1" />
                  <a href="#" className="btn btn-gray btn-round-right"><Icon name="angle-right" /></a>
                </div>
              </div>
            </div>
          </div> */}
        </div>
        <div className="resultTable">
          <div className="resultBody">
            {this.resultList()}
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchForm);