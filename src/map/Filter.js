import { Checkbox, Divider, Select } from 'antd';
import React from 'react';
import './feature-info.scss';
import './filter.scss';

const CheckboxGroup = Checkbox.Group;
const Option = Select.Option;

const plainOptions = ['In place', 'Removed', 'Under review'];
const defaultStatus = [];
const allTypes = ['Sculpture', 'Mural', 'Memorial', 'Mosaic' , 'Media Work', 'Site-integrated work' ,'Figurative','Totem Pole', 'Other'];

export default class Filter extends React.Component {

  state = {
    indeterminate: true,
    checkAll: false,
    status: defaultStatus,
    types: []
  };

  onCheckboxChange = status => {
    this.setState({
      status
    });
  };

  onTypesChange = e => {
    this.setState({ types: e })
  };

  doFilter = e => {
    if (this.props.onFilter) {
      this.props.onFilter({
        status: this.state.status,
        types: this.state.types
      })
    }
  };

  showAll = e => {
    this.setState({ status: [], types: [] });
    if (this.props.onFilter) {
      this.props.onFilter({
        status: [],
        types: []
      })
    }
  }

  render() {
    return (

      <div className="feature-info">
        <h2>Filters</h2>
        <div>
          <Divider orientation="left"> Type </Divider>
          <Select
            mode="multiple"
            style={{ width: '100%' }}
            placeholder="Please select type(s)"
            value={this.state.types}
            onChange={this.onTypesChange}
          >{allTypes.map(type => (
            <Option key={type}>{type}</Option>
          ))}
          </Select>
        </div>
        <div>
          <Divider orientation="left"> Status </Divider>
          <CheckboxGroup
            options={plainOptions}
            value={this.state.status}
            onChange={this.onCheckboxChange}
          />
        </div>
        <Divider orientation="left"></Divider>
        <button className="button" onClick={this.doFilter}>Filter</button>
        <button className="button" onClick={this.showAll}>Reset</button>
      </div>
    )
  }
}
