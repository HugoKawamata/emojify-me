import React from 'react';

export default class Result extends React.Component {
    render() {
        return (
            <div id="result">
                {this.props.res}
            </div>
        )
    }
}