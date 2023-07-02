import "./Spinner.css";
import * as React from 'react';


export default class LoadingSpinner extends React.Component<{}, {}> {
  render() {
    return (
      <div className="spinner-container">
        <div className="loading-spinner">
        </div>
      </div>
    )
  }
}