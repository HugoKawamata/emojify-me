import React, { Component } from 'react';
import logo from './logo.svg';
import Result from "./Result";
import Options from "./Options";
import Pasta from "./Pasta";
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
        Z: ["11111", "00010", "00100", "01000", "11111"],
        0: ["01110", "11001", "10101", "10011", "01110"],
        1: ["01100", "00100", "00100", "00100", "01110"],
        2: ["01110", "10001", "00010", "00100", "11111"],
        3: ["01110", "10001", "00110", "10001", "01110"],
        4: ["10100", "10100", "11111", "00100", "00100"],
        5: ["11111", "10000", "11110", "00001", "11110"],
        6: ["01110", "10000", "11110", "10001", "01110"],
        7: ["11111", "00001", "00010", "00100", "00100"],
        8: ["01110", "10001", "01110", "10001", "01110"],
        9: ["01110", "10001", "01111", "00001", "01110"]
      }
    }
    this.generate = this.generate.bind(this);
    this.convert = this.convert.bind(this);
    this.splitText = this.splitText.bind(this);
  }

  splitText(lineLength, text) {
    let res = text.split(" ")
    
    for (let word = 0; word < res.length; word++){
      if (res[word].length > lineLength){
        console.log(lineLength + " split")
        let fourBlocks = [];
        for (let i = 0; i < res[word].length; i += lineLength) {
          fourBlocks.push(res[word].substring(i, i+lineLength));
        }
        res.splice(word, 1);
        for (let i = fourBlocks.length - 1; i >= 0; i--) {
          res.splice(word, 0, fourBlocks[i]);
        }
      }
      console.log(res[word]);
    }

    return res;
  }

  generate(c1, c2, lineLength, text) {
    if (!Number.isInteger(lineLength)) {
      this.setState({result: "Please enter a valid line length"})
    }
    let wordList = this.splitText(lineLength, text);
    let result = [];
    for (let wordI = 0; wordI < wordList.length; wordI++) {
      let word = [];
      word.push(<span key={"word " + wordI + " start"}></span>)
      let paddingRow = [];
      paddingRow.push(<span key="padding 0 start">{c1}</span>);

      for (let letter = 0; letter < wordList[wordI].length; letter++) {
        paddingRow.push(<span key={"padding 0 letter " + letter}>{c1 + c1 + c1 + c1 + c1 + c1}</span>);
      }

      word.push(<div key={"padding 0 cont"}>{paddingRow}</div>);
      
      for (let rowI = 0; rowI < 5; rowI++){
        let row = [];
        row.push(<span key={"row " + rowI + " start"}>{c1}</span>);

        for (let i = 0; i < wordList[wordI].length; i++){
          if (!wordList[wordI][i].match(/[a-zA-Z0-9]/i)) {
            this.setState({result: (wordList[wordI][i] + " is not a valid character")});
            return;
          }
          row.push(<span key={"row " + rowI + "letter " + (i + 1)}>
            {this.convert(c1, c2, this.state.letters[wordList[wordI][i]][rowI])}
            </span>);
          row.push(<span key={"row " + rowI + "letter " + (i + 1) + " end"}>{c1}</span>);
        }
        word.push(<div key={"row " + rowI}>{row}</div>)
      }
      paddingRow = [];
      paddingRow.push(<span key={"padding " + (wordI + 1) +  " start"}>{c1}</span>);

      for (let letter = 0; letter < wordList[wordI].length; letter++) {
        paddingRow.push(<span key={"padding " + (wordI + 1) + " letter " + letter}>{c1 + c1 + c1 + c1 + c1 + c1}</span>);
      }
      word.push(<div key={"padding " + (wordI + 1) + " cont"}>{paddingRow}</div>);

      result.push(<div key={"word" + wordI}>{word}</div>)
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
        <div className="everything-cont">
          <div className="features-cont">
            <div className="header">
              <h1>Emojify Me</h1>
              <Options generate={(c1, c2, lineLength, text) => this.generate(c1, c2, lineLength, text)}/>
            </div>
        
            <Result res={this.state.result} />
          </div>

          <Pasta />
        </div>
      </div>
    );
  }
}

export default App;
