import React from 'react';
import PropTypes from 'prop-types';

import '../styles/App.scss';
import { Button, FormControl } from 'react-bootstrap';
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    document.addEventListener("acknowledgeKong",  (event) => { // (1)
      console.log(event);
      if(event.detail.type === "add")
        this.props.change( this.props.number + 10);
      if(event.detail.type === "sub")
        this.props.change( this.props.number - 10);
    });
  }
  handleChange(e) {
    parseInt(e.target.value) ? this.props.change(parseInt(e.target.value)) : '';
  }
  render() {
    return (<div className="container">
      <span>I'm the Kong, I'm 10 times the King</span>
      <div>
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
