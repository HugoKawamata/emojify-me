import React from 'react';

export default class Options extends React.Component {
    constructor() {
        super();
        this.state = {
            char1: "",
            char2: "",
            text: "",

        }
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event) {
        switch (event.target.id) {
            case "char1":
                this.setState({char1: event.target.value});
                break;
            case "char2":
                this.setState({char2: event.target.value});
                break;
            case "text":
                this.setState({text: event.target.value});
                break;
            default:
                console.log("handleChange got a strange field");

        }
    }

    render() {
        return (
            <div id="options">
                <label htmlFor="char1">Character 1</label>
                <input type="text" id="char1" maxLength="1" onChange={this.handleChange} name="char1" /><br/>
                <label htmlFor="char2">Character 2</label>
                <input type="text" id="char2" maxLength="1" onChange={this.handleChange} name="char2" /><br/>
                <label htmlFor="text">Text</label>
                <input type="text" id="text" onChange={this.handleChange} name="text" /><br/>
                <input type="submit" value="Generate" onClick={() => this.props.generate(this.state.char1, this.state.char2, this.state.text)}/>
            </div>
        )
    }
}