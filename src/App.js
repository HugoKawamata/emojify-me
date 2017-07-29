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
        A: ["00100", "01010", "11111", "10001", "10001"],
        B: ["11110", "10001", "11110", "10001", "11110"],
        C: ["01111", "10000", "10000", "10000", "01111"],
        D: ["11110", "10001", "10001", "10001", "11110"],
        E: ["11111", "10000", "11111", "10000", "11111"],
        F: ["11111", "10000", "11111", "10000", "10000"],
        G: ["01111", "10000", "10011", "10001", "01110"],
        H: ["10001", "10001", "11111", "10001", "10001"],
        I: ["11111", "00100", "00100", "00100", "11111"],
        J: ["11111", "00010", "00010", "00010", "11100"],
        K: ["10001", "10010", "11100", "10010", "10001"],
        L: ["10000", "10000", "10000", "10000", "11111"],
        M: ["10001", "11011", "10101", "10001", "10001"],
        N: ["10001", "11001", "10101", "10011", "10001"],
        O: ["01110", "10001", "10001", "10001", "01110"],
        P: ["11110", "10001", "11110", "10000", "10000"],
        Q: ["01110", "10001", "10101", "10010", "01101"],
        R: ["11110", "10001", "11110", "10001", "10001"],
        S: ["01111", "10000", "01110", "00001", "11110"],
        T: ["11111", "00100", "00100", "00100", "00100"],
        U: ["10001", "10001", "10001", "10001", "01110"],
        V: ["10001", "10001", "10001", "01010", "00100"],
        W: ["10001", "10001", "10101", "11011", "10001"],
        X: ["10001", "01010", "00100", "01010", "10001"],
        Y: ["10001", "01010", "00100", "00100", "00100"],
        Z: ["11111", "00010", "00100", "01000", "11111"]
      }
    }
    this.generate = this.generate.bind(this);
    this.convert = this.convert.bind(this);
  }

  generate(c1, c2, text) {
    let result = [];
    for (let rowI = 0; rowI < 5; rowI++){
      let row = [];
      row.push(<span key={"row " + rowI + " start"}>{c1}</span>)

      for (let i = 0; i < text.length; i++){
        row.push(<span key={"row " + rowI + "letter " + (i + 1)}>{this.convert(c1, c2, this.state.letters[text[i]][rowI])}</span>);
        row.push(<span key={"row " + rowI + "letter " + (i + 1) + " end"}>{c1}</span>);
      }
      row.push(<br key={"row " + rowI + " end" }/>);
      result.push(row)

    }

    this.setState({result: result});
  }

  convert(c1, c2, row) {
    let newRow = "";
    for (let i = 0; i < 5; i++) {
      newRow += (row[i] === "0" ? c1 : c2);
    }
    return newRow;
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
