import * as React from 'react';
import './style.css';
import { Icon } from 'react-fa';
import SelectComponent from 'Components/SelectComponent';
import { Link } from 'react-router-dom';
import { connect, Dispatch } from 'react-redux';
import { getTranslation, SupportedLanguage } from 'Services/Geo';
import { changeState, CriteriaState, reverseAreaCode } from 'Redux/Modules/Criteria';

const mapStateToProps = (state: any) => ({
  lang: state.status.lang,
  isPersist: state.status.isPersist,
  payload: state.criteria
});

const mapDispatchToProps = (dispatch: Dispatch<{}>) => ({
  changeState: (payload: Partial<CriteriaState>) => {
    dispatch(changeState(payload));
  }
});

interface SearchBarProps {
  lang: SupportedLanguage;
  isPersist: boolean;
  payload: Partial<CriteriaState>;
  changeState: (payload: Partial<CriteriaState>) => void;
}

interface SelectBarState {
  isAdvance: boolean;
  bthrooms: number;
  bdrooms: number;
  lowerPrice: number;
  upperPrice: number;
  area: string;
  keyword: string;
}

class SearchBar extends React.Component<SearchBarProps, SelectBarState> {
  listBed: string[];
  listBath: string[];
  constructor(props: SearchBarProps) {
    super(props);
    this.state = {
      isAdvance: false,
      bthrooms: 0,
      bdrooms: 0,
      lowerPrice: 0,
      upperPrice: 100000000,
      area: '',
      keyword: ''
    };
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    const criteria : Partial<CriteriaState> = {}
    criteria[name] = value;
    this.props.changeState(criteria);
  }

  handleArea = (areaValue: string) => {
    this.props.changeState({ area: areaValue });
  }

  handleBdrooms = (bdrValue: number) => {
    this.props.changeState({ lowerBdrooms: bdrValue });
  }

  handleBthrooms = (bthValue: number) => {
    this.props.changeState({ lowerBthrooms: bthValue });
  }

  toggleAdvSearch = () => {
    this.setState({
      isAdvance: !this.state.isAdvance
    });
  }
  render() {
    if (!this.props.isPersist) {
      return (null);
    }
    const listBed = [
      getTranslation(this.props.lang, 'Bedrooms'),
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7'
    ];
    const listBath = [
      getTranslation(this.props.lang, 'Bathrooms'),
      '1',
      '2',
      '3',
      '4'
    ];

    const listAreas = [
      getTranslation(this.props.lang, 'Area'),
      'Northeast Tallahasse',
      'Northwest Tallahasse',
      'Southeast Tallahasse',
      'Southwest Tallahasse',
      'Gadsden',
      'Jackson',
      'Jefferson',
      'Franklin',
      'Liberty',
      'Madison',
      'Taylor',
      'Wakulla 1',
      'Wakulla 2',
      'Wakulla 3',
      'Wakulla 4',
      'Wakulla 5',
      'Wakulla 6',
      'Wakulla 7',
      'Wakulla 8',
      'Wakulla 9',
      'Wakulla Old',
      'Other',
      'Other Ga'
    ];
    return (
      <div className="search-panel">
        <form className="form-inline" role="form">
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="keyword"
              name="keyword" onChange={this.handleChange}  value={this.props.payload.keyword}
              placeholder={getTranslation(this.props.lang, 'Search for a keyword (pool, fireplace, internet...etc)')}
            />
          </div>
          <div className={`form-group${this.state.isAdvance ? ' adv' : ' hidden-xs'}`}>
            <SelectComponent name="area" selected={undefined} onSelect={this.handleArea} switchTop={true} listItem={listAreas}>
              {getTranslation(this.props.lang, 'Area')}
            </SelectComponent>
          </div>
          <div className={`form-group${this.state.isAdvance ? ' adv' : ' hidden-xs'}`}>
            <SelectComponent name="bdrooms" selected={this.props.payload.lowerBdrooms} onSelect={this.handleBdrooms} switchTop={true} listItem={listBed}>
              {getTranslation(this.props.lang, 'Bedrooms')}
            </SelectComponent>
          </div>
          <div className={`form-group${this.state.isAdvance ? ' adv' : ' hidden-xs'}`}>
            <SelectComponent name="bthrooms" selected={this.props.payload.lowerBthrooms} onSelect={this.handleBthrooms} switchTop={true} listItem={listBath}>
              {getTranslation(this.props.lang, 'Bathrooms')}
            </SelectComponent>
          </div>
          <div className={`form-group${this.state.isAdvance ? ' adv' : ' hidden-xs'}`}>
            <div className="input-group">
              <div className="input-group-addon">$</div>
              <input
                className="form-control price"
                type="number" name="lowerPrice" onChange={this.handleChange} value={this.props.payload.lowerPrice}
                placeholder={getTranslation(this.props.lang, 'From')}
              />
            </div>
          </div>
          <div className={`form-group${this.state.isAdvance ? ' adv' : ' hidden-xs'}`}>
            <div className="input-group">
              <div className="input-group-addon">$</div>
              <input className="form-control price"
                type="number" name="upperPrice" onChange={this.handleChange} value={this.props.payload.upperPrice}
                placeholder={getTranslation(this.props.lang, 'To')} />
            </div>
          </div>
          {/* <div className={`form-group${this.state.isAdvance ? ' adv' : ' hidden-xs'}`}>
            <div className="checkbox custom-checkbox">
              <label>
                <input type="checkbox" />
                <Icon name="check" /> {getTranslation(this.props.lang, 'For rent')}</label>
            </div>
          </div>
          <div className={`form-group${!this.state.isAdvance ? ' hidden-xs' : ''}`}>
            <div className="checkbox custom-checkbox"><label>
              <input type="checkbox" /><Icon name="check" /> {getTranslation(this.props.lang, 'For sale')} </label>
            </div>
          </div> */}
          <div className="form-group">
            <Link to="/search" className="btn btn-green isThemeBtn">{getTranslation(this.props.lang, 'Search')}</Link>
            <a
              href="#"
              className={`btn btn-o btn-white pull-right visible-xs${this.state.isAdvance ? ' advBtnActive' : ''}`}
              onClick={this.toggleAdvSearch}
            >
              {getTranslation(this.props.lang, 'Advance Search')}
              <Icon name={`${this.state.isAdvance ? 'angle-down' : 'angle-up'}`} />
            </a>
          </div>
        </form>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);