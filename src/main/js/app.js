'use strict';

//importing react.js
const React = require('react');
const ReactDOM = require('react-dom');
const client = require('./client');

//outputting table representation of rectangle database with react
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {rectangles: []};
    }

    componentDidMount() {
        client({method: 'GET', path: '/api/rectangles'}).done(response => {
            this.setState({rectangles: response.entity._embedded.rectangles});
        });
    }

    render() {
        return (
            <RectangleList rectangles={this.state.rectangles}/>
        )
    }
}

class RectangleList extends React.Component {
    render() {
        var rectangles = this.props.rectangles.map(rectangle =>
            <Rectangle key={rectangle._links.self.href} rectangle={rectangle} />
        );
        return (
            <table>
                <tbody>
                    <tr>
                        <th>X1</th>
                        <th>Y1</th>
                        <th>X2</th>
                        <th>Y2</th>
                    </tr>
                    {rectangles}
                </tbody>
            </table>
        )
    }
}

class Rectangle extends React.Component {
    render() {
        return (
            <tr>
                <td>{this.props.rectangle.x1}</td>
                <td>{this.props.rectangle.y1}</td>
                <td>{this.props.rectangle.x2}</td>
            </tr>
        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('react')
)