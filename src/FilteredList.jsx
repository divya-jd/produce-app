import React, { Component } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import List from './List';

class FilteredList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      type: "all"
    };
  }

  onSearch = (event) => {
    this.setState({search: event.target.value.trim().toLowerCase()});
  }

  onTypeSelect = (eventKey) => {
    this.setState({type: eventKey});
  }

  filterItem = (item) => {
    const matchesSearch = item.name.toLowerCase().includes(this.state.search);
    const matchesType = this.state.type === "all" || item.type.toLowerCase() === this.state.type;
    return matchesSearch && matchesType;
  }

  render() {
    return (
      <div className="filter-list">
        <h1>Produce Search</h1>
        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            Type: {this.state.type}
          </Dropdown.Toggle>
  
          <Dropdown.Menu>
            <Dropdown.Item eventKey="all" onSelect={this.onTypeSelect}>All</Dropdown.Item>
            <Dropdown.Item eventKey="fruit" onSelect={this.onTypeSelect}>Fruit</Dropdown.Item>
            <Dropdown.Item eventKey="vegetable" onSelect={this.onTypeSelect}>Vegetable</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <input type="text" placeholder="Search" onChange={this.onSearch} />
        <List items={this.props.items.filter(this.filterItem)} />
      </div>
    );
  }
} // <-- This closing brace was missing

export default FilteredList;