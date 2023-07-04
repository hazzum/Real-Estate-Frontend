import * as React from 'react';
import './style.css';
import { Link } from 'react-router-dom';

interface ListCompProps {
  list: string[];
}

class ListComp extends React.Component<ListCompProps, {}> {
  constructor(props: ListCompProps) {
    super(props);
    this.state = {

    };
  }
  render() {
    return (
      <div className="listComp col-xs-6 col-sm-6 col-md-4 col-lg-6">
        <div className="listCompTitle osLight">
          {this.props.children}
        </div>
        <ul className="listMain">
          {this.props.list.map((item, index) => {
            switch (item) {
              case 'Home Page':
                return (
                  <li key={index}><Link to="/">{item}</Link></li>
                );
              case 'Listings':
                return (
                  <li key={index}><Link to="/search">{item}</Link></li>
                );
              case 'Contact Us':
                return (
                  <li key={index}><Link to="/contact">{item}</Link></li>
                );
              case 'About Us':
                return (
                  <li key={index}><Link to="/about">{item}</Link></li>
                );
              default:
                return (
                  <li key={index}><a href="#">{item}</a></li>
                );
            }
          })}
        </ul>
      </div>
    );
  }
}

export default ListComp;