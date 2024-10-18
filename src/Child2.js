import React, { Component } from "react";
import * as d3 from "d3";

class Child2 extends Component {
  componentDidMount() {
    this.renderChart();
  }

  componentDidUpdate() {
    this.renderChart();
  }

  renderChart() {
    const margin = { top: 50, right: 20, bottom: 50, left: 60 }, // Increased left margin
      w = 500 - margin.left - margin.right,
      h = 300 - margin.top - margin.bottom;

    const data = this.props.data2; // Get data from props

    // Calculate average tips per day of the week
    const temp_data = d3.flatRollup(
      data,
      (v) => d3.mean(v, (d) => parseFloat(d.tip)), // Calculate average tip
      (d) => d.day // Group by day
    );

    const x_data = temp_data.map((item) => item[0]); // Days of the week
    const y_data = temp_data.map((item) => item[1]); // Average tips

    const svg = d3.select(".child2_svg")
      .attr("width", w + margin.left + margin.right)
      .attr("height", h + margin.top + margin.bottom);

    const container = svg.select(".g_2")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Set up scales
    const x_scale = d3.scaleBand()
      .domain(x_data)
      .range([0, w])
      .padding(0.1); // Spacing between bars

    const y_scale = d3.scaleLinear()
      .domain([0, d3.max(y_data)]) // Padding on top of max value
      .range([h, 0]);

    // Create bars
    container.selectAll(".bar")
      .data(temp_data)
      .join("rect")
      .attr("class", "bar")
      .attr("x", (d) => x_scale(d[0])) // Set x position
      .attr("y", (d) => y_scale(d[1])) // Set y position
      .attr("width", x_scale.bandwidth()) // Bar width
      .attr("height", (d) => h - y_scale(d[1])) // Bar height
      .attr("fill", "#69b3a2");

    // Add the x-axis
    const x_axis_generator = d3.axisBottom(x_scale);
    container.selectAll(".x_axis").data([0]).join("g")
      .attr("class", "x_axis")
      .attr("transform", `translate(0,${h})`)
      .call(x_axis_generator);

    // Add the y-axis
    const y_axis_generator = d3.axisLeft(y_scale);
    container.selectAll(".y_axis").data([0]).join("g")
      .attr("class", "y_axis")
      .call(y_axis_generator);

    // Add x-axis label using container
    container.append("text")
      .attr("class", "x-axis-label")
      .attr("x", w / 2) // Center x-axis label
      .attr("y", h + 35) // Position below the x-axis
      .attr("text-anchor", "middle")
      .style("font-weight", "bold")
      .text("Day");

    // Add y-axis label using container
    container.append("text")
      .attr("class", "y-axis-label")
      .attr("transform", "rotate(-90)") // Rotate the y-axis label
      .attr("y", -40) // Adjust vertical position
      .attr("x", -h / 2) // Position to the left of the y-axis
      .attr("text-anchor", "middle")
      .style("font-weight", "bold")
      .text("Average Tip");

    // Add a title using container
    container.append("text")
      .attr("class", "my_title")
      .attr("x", w / 2) // Center title
      .attr("y", -10) // Position above the graph
      .attr("text-anchor", "middle") // Center the text
      .style("font-weight", "bold")
      .text("Average Tip By Day");
  }

  render() {
    return (
      <svg className="child2_svg">
        <g className="g_2"></g>
      </svg>
    );
  }
}

export default Child2;
