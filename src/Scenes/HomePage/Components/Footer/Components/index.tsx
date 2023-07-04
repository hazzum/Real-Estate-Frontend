import * as React from 'react';
import './style.css';

import ListComp from './ListComp';
import GetInTouch from './GetInTouch';
// import Subscribe from './Subscribe';

const currentYear = new Date().getFullYear();

class FooterContainer extends React.Component<{}, {}> {
  listCompany =  [
    'Home Page',
    'Listings',
    'Contact Us',
    'About Us'
  ];
  listDiscover = [
    'Become a Member',
    'Properties List',
    'Sign in',
    'Widgets',
    'Components',
    'Tables',
    'Lists'
  ];
  render() {
    return (
      <div className="footerContainer">
        <div className="row">
            <GetInTouch>Get in Touch</GetInTouch>
            <ListComp list={this.listCompany}>Company</ListComp>
            {/* <ListComp list={this.listDiscover}>Discover</ListComp> */}
            {/* <Subscribe>Subscribe to Our Newsletter</Subscribe> */}
        </div>
        <div className="footerCopyRight">
        Sam Realtors | XCELLENCE REALTY<br/> © {currentYear} Sam Realtors | XCELLENCE REALTY<br/>
        </div>
      </div>
    );
  }
}

export default FooterContainer;