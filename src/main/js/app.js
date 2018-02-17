
'use strict';

const React = require('react');
const ReactDOM = require('react-dom');
const promise = require('./promise.js');
const client = require('./client');
const follow = require('./follow');

var root = '/api';

/**
 * Rectangle represented as (x1,y1), (x2,y2).
 */
class CustomRectangle extends React.Component {
    render() {
        return (
            <tr>
                <td>{this.props.customRectangle.x1}</td>
                <td>{this.props.customRectangle.y1}</td>
                <td>{this.props.customRectangle.x2}</td>
                <td>{this.props.customRectangle.y2}</td>
            </tr>
        );
    }
}

/**
 * Gets the data for the React.js view from the REST endpoint.
 */
class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {customRectangles: []};
    }

    loadFromServer(pageSize) {
        follow(client, root, [
            {rel: 'customRectangles', params: {size: pageSize}}]
        ).then(rectangleCollection => {
            return client({
                method: 'GET',
                path: rectangleCollection.entity._links.profile.href,
                headers: {'Accept': 'application/schema+json'}
            }).then(schema => {
                this.schema = schema.entity;
                return rectangleCollection;
            });
        }).done(rectangleCollection => {
            this.setState({
                customRectangles: rectangleCollection.entity.
                    _embedded.customRectangles,
                attributes: Object.keys(this.schema.properties),
                pageSize: pageSize,
                links: rectangleCollection.entity._links});
        });
    }

    componentDidMount() {
        this.loadFromServer(this.state.pageSize);
    }

    render() {
        return (
            <RectangleList customRectangles={this.state.customRectangles}/>
        )
    }
}

/**
 * 'this.props.customRectangles' is transformed from an array of customRectangle
 * records into an array of <Element /> React components.
 */
class RectangleList extends React.Component {
    render() {
        var customRectangles = this.props.customRectangles.map(customRectangle =>
            <CustomRectangle key={customRectangle._links.self.href}
                    customRectangle={customRectangle}/>
        );
        return (
            <div className="container">
                <table className="table table-striped">
                    <tbody>
                        <tr>
                            <th>x1</th>
                            <th>y1</th>
                            <th>x2</th>
                            <th>y2</th>
                        </tr>
                        {customRectangles}
                    </tbody>
                </table>
            </div>
        );
    }
}

/* TODO: You might want to remove this test data that was added for debugging. */
var RECTANGLES = [
  {x1: 1, y1: 1, x2: 2, y2: 2},
  {x1: 3, y1: 3, x2: 4, y2: 4},
  {x1: 5, y1: 5, x2: 6, y2: 6},
  {x1: 7, y1: 7, x2: 8, y2: 8},
];

/*
 * Replaces the ReactDOM.render with the newly created App class.
 */
ReactDOM.render(
    /* TODO: You might want to remove this test line that was added for debugging. */
    //<RectangleTable rectangles={RECTANGLES}/>,
    <App />,
    document.getElementById("root")
);

