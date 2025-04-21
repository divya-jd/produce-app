import React, { Component } from 'react';
import { Container, Row, Col, DropdownButton, Dropdown, Form, Button, Card, Badge } from 'react-bootstrap';
import List from './List';

class FilteredList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      type: "all",
      count: 0
    };
  }

  onSearch = (event) => {
    this.setState({ search: event.target.value.trim().toLowerCase() });
  }

  onFilterSelect = (eventKey) => {
    this.setState({ type: eventKey });
  }

  incrementCount = () => {
    this.setState((prevState) => ({ count: prevState.count + 1 }));
  }

  filterItem = (item) => {
    const matchesSearch = item.name.toLowerCase().includes(this.state.search);
    const matchesType = this.state.type === "all" || item.type.toLowerCase() === this.state.type;
    return matchesSearch && matchesType;
  }

  render() {
    return (
      <Container className="mt-5">
        <Card className="p-4 shadow-lg">
          <h2 className="mb-4 text-center">🥦 Produce Search 🍎</h2>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Control
                type="text"
                placeholder="🔍 Search for an item..."
                onChange={this.onSearch}
              />
            </Col>
            <Col md={3}>
              <DropdownButton
                variant="outline-primary"
                title={`Filter: ${this.state.type.charAt(0).toUpperCase() + this.state.type.slice(1)}`}
                onSelect={this.onFilterSelect}
              >
                <Dropdown.Item eventKey="all">All</Dropdown.Item>
                <Dropdown.Item eventKey="fruit">Fruit</Dropdown.Item>
                <Dropdown.Item eventKey="vegetable">Vegetable</Dropdown.Item>
              </DropdownButton>
            </Col>
            <Col md={3} className="text-end">
              <Button variant="success" onClick={this.incrementCount}>
                Click Me ➕
              </Button>
              <Badge bg="dark" className="ms-2 fs-6">{this.state.count}</Badge>
            </Col>
          </Row>

          <hr />

          <List items={this.props.items.filter(this.filterItem)} />
        </Card>
      </Container>
    );
  }
}

export default FilteredList;
