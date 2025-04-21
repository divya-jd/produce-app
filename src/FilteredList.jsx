import React, { Component } from 'react';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import List from './List';

class FilteredList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      type: "all",
      counts: {}
    };
  }

  onSearch = (event) => {
    this.setState({ search: event.target.value.trim().toLowerCase() });
  };

  onFilterSelect = (eventKey) => {
    this.setState({ type: eventKey });
  };

  filterItem = (item) => {
    const matchesSearch = item.name.toLowerCase().includes(this.state.search);
    const matchesType = this.state.type === "all" || item.type.toLowerCase() === this.state.type;
    return matchesSearch && matchesType;
  };

  handleAdd = (itemName) => {
    this.setState(prevState => ({
      counts: {
        ...prevState.counts,
        [itemName]: (prevState.counts[itemName] || 0) + 1
      }
    }));
  };

  render() {
    const filteredItems = this.props.items.filter(this.filterItem);

    return (
      <div className="filter-list">
        <h1>Produce Search</h1>

        <DropdownButton id="typeDropdown" title="Type">
          <Dropdown.Item eventKey="all" onSelect={this.onFilterSelect}>All</Dropdown.Item>
          <Dropdown.Item eventKey="fruit" onSelect={this.onFilterSelect}>Fruit</Dropdown.Item>
          <Dropdown.Item eventKey="vegetable" onSelect={this.onFilterSelect}>Vegetable</Dropdown.Item>
        </DropdownButton>

        <input type="text" placeholder="Search" onChange={this.onSearch} />

        <List
          items={filteredItems}
          counts={this.state.counts}
          onAdd={this.handleAdd}
        />
      </div>
    );
  }
}

export default FilteredList;
