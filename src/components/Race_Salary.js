import React, { Component } from 'react';
import * as d3 from 'd3';
import race_salary from '../data/race_salary.csv'
import 'bulma/css/bulma.css';

class Race_Salary extends Component {

  state = {}
  
    componentDidMount() {
  
      this.loadData();
      
    }
  
    loadData = () => {
      
      // load data from race_salary csv
      d3.csv(race_salary, (data) => {
        
        // set up const variables to be used throughout
        const margin = {top: 40, right: 40, bottom: 40, left: 180};
        const svg = d3.select('svg');
        // set width and height variables while leaving margins
        const w = +svg.attr('width') - margin.left - margin.right;
        const h = +svg.attr('height') - margin.top - margin.bottom;
        const formatPercent = d3.format(',.0%');
        // append an svg element to the body with width/height equal to variables above
        const svgBarChart = d3.select('body')
                .append('svg')
                .attr('width', w)
                .attr('height', h);
        // set up a linear scale to be used for the x Axis
        let xScale = d3.scaleLinear()
              // set domain to extend from 0 to 1 for accurate % scale
              .domain([0,1])
              // set range to extend to the width of the element
              .range([0,w])
        // set up an ordinal scale to be used for the y axis
        let yScale = d3.scaleBand()
              // for each value in data, create an entry with the race key
              .domain(data.map(d => d.race))
              // range set from 0 to height
              .range([0, h])
              // padding between bars
              .padding(0.1);
        // an svg canvas for the graph itself to be written to
        let g = svg.append('g')
              .attr('transform', `translate(${margin.left}, ${margin.top})`);
        // function to create gridlines that run through the middle of the graph
        let makeXGridlines = () => {
                // line positions based on the xScale, with 9 ticks (10 - 100)
                return d3.axisBottom(xScale)
                  .ticks(9)
              }
        // append X Axis percentage-formatted labels and ticks to bottom of graph
        g.append('g')
              .attr('transform', `translate(0,${h})`)
              .call(d3.axisBottom(xScale)
                .tickFormat(formatPercent)
              );
        // append Y Axis labels based on yScale and race_salary data keys
        g.append('g')
              .call(d3.axisLeft(yScale)
                // no ticks
                .tickSize(0)
                .tickPadding(3)
              );
        // append gridlines using makeXGridlines function above
        g.append('g')			
              .attr('class', 'grid')
              // make lines span the height of the graph
              .attr('transform', `translate(0,${h})`)
              .call(makeXGridlines()
                  // negative value for the "wrong" direction
                  .tickSize(-h)
                  // no formatting/labeling
                  .tickFormat('')
              );
        // append data bars
        g.append("g").selectAll("rect")
            .data(data)
            .enter().append("rect")
            // place bar based on race key
            .attr("y", d => yScale(d.race))
            .attr("x", 0)
            // percentage over 50k field should inform the width of each bar
            .attr("width", d => xScale(d.over_50_k))
            // dynamically sets height/size of the bar based on data fields
            .attr("height", yScale.bandwidth())
            .attr("fill", "steelblue")
            .attr('fill-opacity', 0.9);
        // append "false" or empty bars to fill remaining space
        g.append("g").selectAll("rect")
            .data(data)
            .enter().append("rect")
            // set the starting y value based on race key, as above
            .attr("y", d => {
              return yScale(d.race)
            })
            // x position should start where data bar leaves off, at the data value max
            .attr("x", d => {
              return xScale(d.over_50_k)
            })
            // the width of the bar should be equal to the total width minus the data value. this results in a complimentary value to the data bars.
            .attr("width", d => {
              return w - xScale(d.over_50_k)
            })
            .attr("height", yScale.bandwidth())
            .attr("fill", "lightcoral")
            .attr('fill-opacity', 0.75);
        // false legend square
        svg.append('rect')
            .attr('fill', 'lightcoral')
            .attr('fill-opacity', 0.57)
            .attr('width', 25)
            .attr('height', 20)
            .attr('x', w + 120)
            .attr('y', 0)
            .attr('transform', 'translate(0,12.5)');
        // true legend square 
        svg.append('rect')
            .attr('fill', 'steelblue')
            .attr('fill-opacity', 0.75)
            .attr('width', 25)
            .attr('height', 20)
            .attr('x', w + 40)
            .attr('y', 0)
            .attr('transform', 'translate(0,12.5)');
        // false legend text
        svg.append('text')
            .attr('x', w + 10)
            .attr('y', 0)
            .text('True')
            .attr('font-family', 'BlinkMacSystemFont,-apple-system,,Roboto,Oxygen,Ubuntu,Cantarell,Helvetica,Arial,sans-serif')
            .attr('font-size', '12px')
            .attr('fill', 'black')
            .attr('transform', 'translate(0,27)');
        // true legend text
        svg.append('text')
            .attr('x', w + 85)
            .attr('y', 0)
            .text('False')
            .attr('font-family', 'BlinkMacSystemFont,-apple-system,,Roboto,Oxygen,Ubuntu,Cantarell,Helvetica,Arial,sans-serif')
            .attr('font-size', '12px')
            .attr('fill', 'black')
            .attr('transform', 'translate(0,27)');
        // graph title
        svg.append('text')
            .attr('x', 200)
            .attr('y', 0)
            .text('Race and Pay (+$50k)')
            .attr('font-family', 'BlinkMacSystemFont,-apple-system,,Roboto,Oxygen,Ubuntu,Cantarell,Helvetica,Arial,sans-serif')
            .attr('font-size', '20px')
            .attr('font-weight', 'bold')
            .attr('fill', 'black')
            .attr('transform', 'translate(0,32)');
      })
      
    }

  render() {
    return (
      <div>
        <svg width="960" height="500"></svg>
      </div>
    );
  }
}

export default Race_Salary;