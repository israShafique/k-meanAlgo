import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Chart from "./components/chart";
import SubmitComponent from "./components/submitComponent";
class App extends Component {
  constructor() {
    super();
    {
      this.state = {
        chartData: {},
        fileRead: []
      };
    }
  }
  componentWillMount() {
    this.getChartData();
  }
  readTextFile = file => {
    var allText;
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = () => {
      if (rawFile.readyState === 4) {
        if (rawFile.status === 200 || rawFile.status == 0) {
          allText = rawFile.responseText;
        }
      }
    };
    rawFile.send(null);
    return allText;
  };
  splitMulti = (str, tokens) => {
    var tempChar = tokens[0];
    for (var i = 1; i < tokens.length; i++) {
      str = str.split(tokens[i]).join(tempChar);
    }
    str = str.split(tempChar);
    return str;
  };
  getChartData() {
    const file = require("./components/fs.txt");
    var str = this.readTextFile(file);
    var str2 = this.splitMulti(str, [",", "\n"]);
    var num = 0;
    var numofArrays = parseInt(str2[num], 10);
    var newLabels = [];
    var newDataSet = [{}];
    for (var i = 0; i < numofArrays; i++) {
      newLabels[i] = "clustor " + i + "";
    }
    var backColor = [];
    var one = Math.random() * (225 - 50) + 50,
      two = Math.random() * (225 - 50) + 50,
      three = Math.random() * (225 - 50) + 50,
      four = 1;
    for (var h = 0; h < numofArrays; h++) {
      backColor.push(
        "rgba(" + one + ", " + two + ", " + three + ", " + four + ")"
      );
      one = Math.random() * (225 - 50) + 50;
      two = Math.random() * (225 - 50) + 50;
      three = Math.random() * (225 - 50) + 50;
    }
    var skip = num + 1;
    var inc2 = 0;
    var inc = 0;
    var perClustorArray = 0;
    for (var k = 0; k < numofArrays; k++) {
      perClustorArray = skip + 1;
      console.log("perClustorArray" + perClustorArray);
      inc = perClustorArray + 1;
      for (var p = 0; p < parseInt(str2[perClustorArray], 10); p++) {
        newDataSet.push({
          label: newLabels[k],
          backgroundColor: backColor[k],
          data: [
            {
              x: parseFloat(str2[inc]),
              y: parseFloat(str2[inc + 1]),
              r: 10
            }
          ]
        });
        inc = inc + 2;
      }
      skip = inc;
    }

    this.setState({
      chartData: {
        datasets: newDataSet
      }
    });
  }

  render() {
    return (
      <div className="App">
        <SubmitComponent />
        <div
          style={{
            height: 5000,
            width: 1000,
            paddingLeft: 150,
            paddingTop: 100
          }}
        >
          <Chart chartData={this.state.chartData} />
        </div>
      </div>
    );
  }
}

export default App;
