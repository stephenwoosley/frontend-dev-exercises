import React, { Component } from 'react';
import logo from './logo.svg';
import 'bulma/css/bulma.css';
import './App.css';

class App extends Component {

  state = {
    chart1Active: true,
    chart2Active: false,
    chart3Active: false
  }

  // toggle which tab is active on tab click
  toggleActive = event => {
    // switch on the text content of event.target
    switch(event.target.text) {
      // set state for booleans based on target clicked
      case "Chart 1":
        this.setState({chart1Active: true}) 
        this.setState({chart2Active: false})
        this.setState({chart3Active: false})
        break;
      case "Chart 2":
        this.setState({chart1Active: false}) 
        this.setState({chart2Active: true})
        this.setState({chart3Active: false})
        break;
      case "Chart 3":
        this.setState({chart1Active: false}) 
        this.setState({chart2Active: false})
        this.setState({chart3Active: true})
        break;
    }
  }

  render() {
    return (
      <div>
        <nav className="navbar is-primary" role="navigation" aria-label="main navigation">
          <div className="navbar-item is-size-3">
            d3.js + React.js + Bulma CSS
          </div>
        </nav>
        <section>
          <section className="container">
            <div className="tabs">
              <ul>
                <li
                  className={this.state.chart1Active ? 'is-active': null} 
                  onClick={this.toggleActive}
                >
                  <a>Chart 1</a>
                </li>
                <li
                  className={this.state.chart2Active ? 'is-active': null} 
                  onClick={this.toggleActive}
                >
                  <a>Chart 2</a>
                </li>
                <li
                  className={this.state.chart3Active ? 'is-active': null} 
                  onClick={this.toggleActive}
                >
                  <a>Chart 3</a>
                </li>
              </ul>
            </div>
          </section>   
        </section> 
      </div>
    );
  }
}

export default App;
