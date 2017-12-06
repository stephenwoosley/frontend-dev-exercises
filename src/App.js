import React, { Component } from 'react';
import * as d3 from 'd3';
import Education_Salary from './components/Education_Salary';
import Race_Salary from './components/Race_Salary';
import Combined_Chart from './components/Combined_Chart';
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
      case "Education & Salary":
        this.setState({chart1Active: true}) 
        this.setState({chart2Active: false})
        this.setState({chart3Active: false})
        break;
      case "Race & Salary":
        this.setState({chart1Active: false}) 
        this.setState({chart2Active: true})
        this.setState({chart3Active: false})
        break;
      case "Combined Chart":
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
        <section className="container">
          <section className="tab-container">
            <div className="tabs">
              <ul>
                {/* Display an li as active based on state */}
                <li
                  className={this.state.chart1Active ? 'is-active': null} 
                  onClick={this.toggleActive}
                >
                  <a>Education & Salary</a>
                </li>
                <li
                  className={this.state.chart2Active ? 'is-active': null} 
                  onClick={this.toggleActive}
                >
                  <a>Race & Salary</a>
                </li>
                <li
                  className={this.state.chart3Active ? 'is-active': null} 
                  onClick={this.toggleActive}
                >
                  <a>Combined Chart</a>
                </li>
              </ul>
            </div>
            {
              this.state.chart1Active
              ? <Education_Salary/>
              : this.state.chart2Active
                ? <Race_Salary/>
                : <Combined_Chart/>
            }
          </section>   
        </section> 
      </div>
    );
  }
}

export default App;
