import React from 'react';
import PropTypes from 'prop-types';

import '../styles/App.scss';
import { Button, FormControl } from 'react-bootstrap';
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    document.addEventListener("onsumitsubmit",  (event) => { // (1)
      console.log(event);
      // alert("Hello from summit"); // Hello from H1
      this.props.add( this.props.number + event.detail.number);
    });
  }
  handleChange(e) {
    parseInt(e.target.value) ? this.props.change(parseInt(e.target.value)) : '';
  }
  render() {
    return (<div className="container">
      Kong
      <Button bsStyle="primary" onClick={() => this.props.add(this.props.number)}>
        +
      </Button>
      <FormControl
        data-testid="number"
        type="text"
        value={this.props.number}
        onChange={this.handleChange}
      />
      <Button bsStyle="primary" onClick={() => this.props.sub(this.props.number)}>
        -
      </Button>
    </div>
    );
  }
}

App.propTypes = {
  number: PropTypes.number,
  add: PropTypes.func,
  sub: PropTypes.func,
  change: PropTypes.func,
};
