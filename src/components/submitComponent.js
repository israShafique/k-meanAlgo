import React, { Component } from "react";
import ReactDOM from "react-dom";
//import axios, {post} from 'axios';

class SubmitComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: ""
    };
  }
  onChange(e) {
    let files = e.target.files;
    let reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onLoad = e => {
      const url = "http://0.0.0.1:8000/api/service";
      const formData = { file: e.target.result };
      return (url, formData).then(response => console.warn("result", response));
    };
  }
  clicked() {
    this.setState({ text: this.refs.textBox.value() });
  }

  render() {
    return (
      <div onSubmit={this.onFormSubmit}>
        <h1>React js Upload File</h1>
        <input type="file" name="file" onChange={e => this.onChange(e)} />
        <h3>Enter number of clusters(k value):-</h3>
        <input ref="textBox" type="text" />
        <h3>Enter number of iterations:-</h3>
        <input ref="textBox" type="text" />
        <button
          onClick={e => {
            this.clicked();
          }}
        >
          Perform k-means clustering
        </button>
      </div>
    );
  }
}
export default SubmitComponent;
