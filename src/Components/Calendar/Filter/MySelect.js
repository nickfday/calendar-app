import React, { Component } from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

class MySelect extends Component {
  logChange(val) {
    this.props.handleSelectedItem(val);
    if (val === null || val.length === 0) {
      this.props.handleSelectedItem('');
    }
  }

  render() {
    let options = [];
    this.props.data.map(element => {
      return options.push({
        value: element,
        label: element
      });
    });

    return (
      <Select
        name="form-field-name"
        value={this.props.selectedItems}
        options={options}
        onChange={this.logChange.bind(this)}
        multi={this.props.multiSelect}
        placeholder={this.props.placeholder}
        className={this.props.className}
      />
    );
  }
}

export default MySelect;
