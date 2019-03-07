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
    this.state = { number: 100 };
  }
  handleChange(e) {
    if (parseInt(e.target.value)) {
      const number = this.state.number;
      this.setState({ number: number + parseInt(e.target.value) });
    }
  }
  handleAction(type) {
    let event = new CustomEvent("onsumitsubmit", { detail: { number: 10 } });
    document.dispatchEvent(event);

    if (type === "add") {
      const number = this.state.number;
      this.setState({ number: number + 1 });
    }
    if (type === "sub") {
      const number = this.state.number;
      this.setState({ number: number - 1 });
    }
  }
  handleJSLoad() {
    if (this.state.number === 110) {
      var aScript = document.createElement('script');
      aScript.type = 'text/javascript';
      aScript.src = 'public/angular.js';

      document.head.appendChild(aScript);
      aScript.onload = function () {
        console.log("fdfdfdf");
      };
      return <angular-app>loading...</angular-app>;
    }
    return null;
  }
  render() {
    return (<div className="container">
      {this.handleJSLoad()}
      King Welcome
      <Button bsStyle="primary" onClick={() => this.handleAction("add")}>
        +
      </Button>
      <FormControl
        data-testid="number"
        type="text"
        value={this.state.number}
        onChange={this.handleChange}
      />
      <Button bsStyle="primary" onClick={() => this.handleAction("sub")}>
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
