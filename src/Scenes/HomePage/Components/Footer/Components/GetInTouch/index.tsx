import * as React from 'react';
import './style.css';

class GetInTouch extends React.Component<{}, {}> {

  render() {
    return (
      <div className="getInTouch col-xs-9 col-sm-9 col-md-8 col-lg-6">
        <div className="touchTitle osLight">
          {this.props.children}
        </div>
        <div style={{ display: 'flex', flexDirection: window.innerWidth > 384 ? 'row' : 'column' }}>
          <ul className="mainList">
            <li className="footer-phone">
              <img src="../sam_ameen.png" height={110} width={110}></img>
              <hr style={{ borderTop: 'hidden' }} />
            </li>
            <li>
              <a href="https://www.facebook.com/xcellencerealtycareers/" target="_blank" className="btn btn-sm btn-icon btn-round btn-o btn-white">
                <span className="fa fa-facebook fa-lg" />
              </a>
              <a href="https://www.instagram.com/xcellencerealty/" target="_blank" className="btn btn-sm btn-icon btn-round btn-o btn-white">
                <span className="fa fa-instagram fa-lg" />
              </a>
            </li>
          </ul>
          <ul className="mainList">
            <li className="footer-phone">
              <span className="fa fa-phone" /> +1 (850) 445-7233
            </li>
            <li className="footer-address osLight">
              <h4><b style={{ color: 'lightblue' }}>H. "Sam" Ameen</b></h4>
              <h5>Realtor ®</h5>
              <h5>Xcellence Realty, Inc.</h5>
              <hr className="SOlid" />
            </li>
            <li>
              <p>
                <span className="fa fa-globe fa-lg">&nbsp;&nbsp;
                  <a className='LinkA' href="https://xcellencerealty.com/agents/hassam-ameen/" target='_blank'>Corporate Website</a>
                </span>
              </p>
              <p>
                <span className="fa fa-envelope fa-lg">&nbsp;&nbsp;
                  <a className='LinkA' href="mailto:hfameen@hotmail.com">hfameen@hotmail.com</a>
                </span>
              </p>
            </li>
            <li className="footer-phone">
              <img src="../XCELLENCE.png" height={85}></img>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default GetInTouch;