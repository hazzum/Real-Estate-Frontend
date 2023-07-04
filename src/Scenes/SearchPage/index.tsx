import * as React from 'react';
import './style.css';
import { RouteComponentProps } from 'react-router-dom';
import Dashboard from 'Components/DashboardLayout';
import SearchForm from './Components/SearchForm';
import Footer from 'Scenes/HomePage/Components/Footer';

class SearchPage extends React.Component<RouteComponentProps<{}>, {}> {
  render() {
    return (
      <div className="searchPage">
        <Dashboard>
          <div className="dashboardTitle">
            <h3>Filter your result</h3>
          </div>
          <div className="searchFormWrapper">
            <SearchForm />
          </div>
          <div className="footerWrapper">
            <Footer />
          </div>
        </Dashboard>
      </div>
    );
  }
}

export default SearchPage;