import React, { Component } from 'react';
import logo from './logo.svg';
import Result from "./Result";
import Options from "./Options";
import './App.css';

class App extends Component {

  constructor() {
    super();
    this.state = {
      result: [],
      letters: {
        A: ["00100", "01010", "11111", "10001", "10001", "10001"],
        B: ["11110", "10001", "11110", "10001", "10001", "11111"],
        C: ["01111", "10000", "10000", "10000", "10000", "11111"],
        D: ["11110", "10001", "10001", "10001", "10001", "11110"],
        E: ["11111", "10000", "11111", "10000", "10000", "11111"]
      }
    }
    this.generate = this.generate.bind(this);
  }

  generate(c1, c2, text) {
    let result = [];
    for (let rowI = 0; rowI < 6; rowI++){
      let row = [];
      row.push(<span key={"row " + rowI + " start"}>0</span>)

      for (let i = 0; i < text.length; i++){
        row.push(<span key={"row " + rowI + "letter " + (i + 1)}>{this.state.letters[text[i]][rowI]}</span>);
        row.push(<span key={"row " + rowI + "letter " + (i + 1) + " end"}>0</span>);
      }
      row.push(<br key={"row " + rowI + " end" }/>);
      result.push(row)

    }

    this.setState({result: result});
  }

  render() {
    return (
      <div className="App">
        <Options generate={(c1, c2, text) => this.generate(c1, c2, text)}/>
        <Result res={this.state.result} />
      </div>
    );
  }
}

export default App;
