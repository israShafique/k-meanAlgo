import React, { Component } from "react";
import { Bubble, Scatter } from "react-chartjs-2";

class Chart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: props.chartData
    };
  }
  render() {
    return (
      <div className="chart">
        <Bubble
          data={this.state.chartData}
          options={{ legend: { display: false } }}
        />
      </div>
    );
  }
}
export default Chart;
