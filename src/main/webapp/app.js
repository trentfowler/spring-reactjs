
'use strict';

const React = require('react');
const ReactDOM = require('react-dom');
const promise = require('./promise.js');
const client = require('./client');
const follow = require('./follow');
const semantic = require('semantic-ui-react');
const toastr = require('toastr');
const root = '/api';

import 'semantic-ui-css/semantic.min.css';

/**
 * Rectangle represented as (x1,y1), (x2,y2).
 */
class CustomRectangle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            display: true,
            edit: false,
        };
        this.handleDelete = this.handleDelete.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleSave = this.handleSave.bind(this);
    }

    handleDelete() {
        var self = this;
        $.ajax({
            url: self.props.customRectangle._links.self.href,
            type: 'DELETE',
            success: function (result) {
                self.setState({display: false});
            },
            error: function (xhr, ajaxOptions, thrownError) {
                toastr.error(xhr.responseJSON.message);
            }
        });
    }

    handleUpdate() {
        var self = this;
        self.setState({edit: true});
    }

    handleSave() {
        var self = this;
        var rectangle = rectangle => {
            <CustomRectangle key={self.props.rectangle._links.self.href}
                             rectangle={self.props.rectangle}/>
        }
        $.ajax({
            url: self.props.rectangle._links.self.href,
            type: 'PUT',
            success: function (data) {

            },
            error: function (xhr, ajaxOptions, thrownError) {
                toastr.error(xhr.responseJSON.message);
            }
        });
    }

    render() {
        if (this.state.display == false) return null;
        else if (this.state.edit == true) {
           return (
               <tr>
                   <td>
                       <div class="ui input">
                           <input type="text" placeholder={
                               this.props.customRectangle.x1}>
                           </input>
                       </div>
                   </td>
                   <td>
                       <div class="ui input">
                           <input type="text" placeholder={
                               this.props.customRectangle.y1}>
                           </input>
                       </div>
                   </td>
                   <td>
                       <div class="ui input">
                           <input type="text" placeholder={
                               this.props.customRectangle.x2}>
                           </input>
                       </div>
                   </td>
                   <td>
                       <div class="ui input">
                           <input type="text" placeholder={
                               this.props.customRectangle.y2}>
                           </input>
                       </div>
                   </td>
                   <td>
                       <div class="ui buttons">
                           <button class="ui button">Cancel</button>
                           <div class="or"></div>
                           <button class="ui positive button"
                                   onClick={this.handleSave}>Save</button>
                       </div>
                   </td>
               </tr>
           );
        }
        else return (
            <tr>
                <td>{this.props.customRectangle.x1}</td>
                <td>{this.props.customRectangle.y1}</td>
                <td>{this.props.customRectangle.x2}</td>
                <td>{this.props.customRectangle.y2}</td>
                <td>
                    <div>
                        <button class="ui button"
                                onClick={this.handleUpdate}>
                            Edit
                        </button>
                        <button class="ui secondary button"
                                onClick={this.handleDelete}>
                            Remove
                        </button>
                    </div>
                </td>
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
        var self = this;
        $.ajax({
            url: "http://localhost:8080/api/customRectangles"
        }).then(function (data) {
           self.setState({customRectangles: data._embedded.customRectangles});
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
                <div class="ui top attached segment">
                    <div class="ui label"></div>
                    <table class="ui selectable compact striped celled table">
                        <thead>
                            <tr>
                                <th>x1</th>
                                <th>y1</th>
                                <th>x2</th>
                                <th>y2</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {customRectangles}
                        </tbody>
                    </table>
                    <div class="ui top attached label">
                        Rectangle Data
                    </div>
                </div>
            </div>
        );
    }
}

/*
 * Replaces the ReactDOM.render with the newly created App class.
 */
ReactDOM.render(
    <App />,
    document.getElementById("root")
);

