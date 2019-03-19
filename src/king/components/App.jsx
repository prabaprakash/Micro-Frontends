import React from 'react';
import PropTypes from 'prop-types';

import '../styles/App.scss';
import { Button, FormControl } from 'react-bootstrap';
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleAction = this.handleAction.bind(this);
    this.handleJSLoad = this.handleJSLoad.bind(this);
  }
  handleChange(e) {
    if (parseInt(e.target.value)) {
      const number = this.state.number;
      this.props.change({ number: number + parseInt(e.target.value) });
    }
  }
  handleAction(type) {
    if (type === "add") {
      this.props.add(this.props.number);

      let event = new CustomEvent("acknowledgeKong", { detail: { type: "add" } });
      document.dispatchEvent(event);
    }
    if (type === "sub") {
      this.props.sub(this.props.number);

      let event = new CustomEvent("acknowledgeKong", { detail: { type: "sub" } });
      document.dispatchEvent(event);
    }
  }
  handleJSLoad() {
    if (this.props.number === 10) {
      var aScript = document.createElement('script');
      aScript.type = 'text/javascript';
      aScript.src = 'public/angular.js';
      document.head.appendChild(aScript);
      aScript.onload = function () {
        console.log("I'm angular, I'm loaded")
      };
      return <angular-app>loading...</angular-app>;
    }
    return null;
  }
  render() {
    return (<div className="container">
      {this.handleJSLoad()}
      <span>I'm the King</span>
      <div>
      <Button bsStyle="primary" onClick={() => this.handleAction("add")}>
        +
      </Button>
      <FormControl
        data-testid="number"
        type="text"
        value={this.props.number}
        onChange={this.handleChange}
      />
      <Button bsStyle="primary" onClick={() => this.handleAction("sub")}>
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
