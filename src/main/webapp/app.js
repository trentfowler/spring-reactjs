
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
import { Icon, Label, Menu, Table, Segment, Input, Button } from 'semantic-ui-react'

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
        if (this.state.edit == true) {
            return (
               <Table.Row>
                   <Table.Cell>
                       <Input fluid type='text' placeholder={this.props.customRectangle.x1}/>
                   </Table.Cell>
                   <Table.Cell>
                       <Input fluid type='text' placeholder={this.props.customRectangle.y1}/>
                   </Table.Cell>
                   <Table.Cell>
                       <Input fluid type='text' placeholder={this.props.customRectangle.x2}/>
                   </Table.Cell>
                   <Table.Cell>
                       <Input fluid type='text' placeholder={this.props.customRectangle.y2}/>
                   </Table.Cell>
                    <Table.Cell>
                        <Button.Group>
                            <Button>Cancel</Button>
                            <Button.Or />
                            <Button positive>Save</Button>
                        </Button.Group>
                    </Table.Cell>
               </Table.Row>
           );
        }
        return (
            <Table.Row>
                <Table.Cell>{this.props.customRectangle.x1}</Table.Cell>
                <Table.Cell>{this.props.customRectangle.y1}</Table.Cell>
                <Table.Cell>{this.props.customRectangle.x2}</Table.Cell>
                <Table.Cell>{this.props.customRectangle.y2}</Table.Cell>
                <Table.Cell>
                    <Button floated={'left'} onClick={this.handleUpdate}>
                        Edit
                    </Button>
                    <Button secondary floated={'left'} onClick={this.handleDelete}>
                        Remove
                    </Button>
                </Table.Cell>
            </Table.Row>
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
            <div class="container">
                <Segment padded>
                    <Label attached='top left'>Rectangle Data</Label>
                    <Table celled selectable>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>x1</Table.HeaderCell>
                                <Table.HeaderCell>y1</Table.HeaderCell>
                                <Table.HeaderCell>x2</Table.HeaderCell>
                                <Table.HeaderCell>y2</Table.HeaderCell>
                                <Table.HeaderCell>Action</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {customRectangles}
                        </Table.Body>
                        <Table.Footer fullWidth>
                           <Table.Row>
                               <Table.HeaderCell>
                                   <Button primary>
                                       Add
                                   </Button>
                               </Table.HeaderCell>
                                <Table.HeaderCell colSpan='5'>
                                    <Menu floated='right' pagination>
                                        <Menu.Item as='a' icon>
                                            <Icon name='left chevron'/>
                                        </Menu.Item>
                                        <Menu.Item as='a'>1</Menu.Item>
                                        <Menu.Item as='a'>2</Menu.Item>
                                        <Menu.Item as='a'>3</Menu.Item>
                                        <Menu.Item as='a'>4</Menu.Item>
                                        <Menu.Item as='a' icon>
                                            <Icon name='right chevron'/>
                                        </Menu.Item>
                                    </Menu>
                                </Table.HeaderCell>
                           </Table.Row>
                        </Table.Footer>
                    </Table>
                </Segment>
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

