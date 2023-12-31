import * as React from 'react';
import './style.css';

interface SelectComponentProps {
  listItem: string[];
  switchTop?: boolean;
  name?: string;
  onSelect: Function;
  selected: any;
}

interface SelectComponentState {
  showList: boolean;
  itemSelected: number;
}

class SelectComponent extends React.Component<SelectComponentProps, SelectComponentState> {
  wrapperRef: HTMLDivElement | null;
  constructor(props: SelectComponentProps) {
    super(props);
    this.state = {
      showList: false,
      itemSelected: this.props.selected ? this.props.listItem.findIndex((ele) => this.props.selected == ele) : 0
    };
  }
  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }
  handleClickOutside = (e: MouseEvent) => {
    if (
      this.wrapperRef &&
      !this.wrapperRef.contains(e.target as Node) &&
      this.state.showList
    ) {
      this.showToggle();
    }
  }
  showToggle = () => {
    if (this.state.showList) {
      document.removeEventListener('mousedown', this.handleClickOutside);
    } else {
      document.addEventListener('mousedown', this.handleClickOutside);
    }
    this.setState({
      showList: !this.state.showList
    });
  }

  doSelect = (index: number) => {
    this.setState({
      itemSelected: index
    });
    this.showToggle();
  }

  chooseClass = (selected: string) => {
    switch (selected) {
      case 'DESC':
        return 'fa fa-sort-amount-desc'
      case 'ASC':
        return 'fa fa-sort-amount-asc'
      default:
        return 'dropdown-label'
    }
  }

  render() {
    return (
      <div
        ref={(div) => { this.wrapperRef = div; }}
        className={'selectComponent' + (this.state.showList ? ' active' : '')}
      >
        <div className="form-control dropdown-toggle" onClick={this.showToggle}>
          <span className="dropdown-label">
            <span className={this.chooseClass(this.props.selected)} />  {this.props.listItem[this.state.itemSelected]}
          </span>
          <span className="caret" />
        </div>
        <ul className={`dropdown-menu dropdown-select${this.props.switchTop ? ' switchTop' : ''}`}>
          {this.props.listItem.map((item, index) => {
            return (
              <li key={index} onClick={e => { this.doSelect(index); this.props.onSelect(item); }}>
                <a><span className={this.chooseClass(item)} />   {item}</a>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default SelectComponent;