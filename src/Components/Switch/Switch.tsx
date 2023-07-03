import * as React from 'react';
import './style.css';
import { ChangeEventHandler } from 'react';

export default class Switch extends React.Component<{ id: string, isOn: boolean, handleToggle: ChangeEventHandler<HTMLInputElement> }, {}> {
  render() {
    return (
      <div id={this.props.id}>
        <input
          checked={this.props.isOn}
          onChange={this.props.handleToggle}
          className="react-switch-checkbox"
          id={`react-switch-new${this.props.id}`}
          type="checkbox"
        />
        <label
          style={{ background: this.props.isOn && '#06D6A0' }}
          className="react-switch-label"
          htmlFor={`react-switch-new${this.props.id}`}
        >
          <span className={`react-switch-button`} />
        </label>
      </div>
    );
  }
};

