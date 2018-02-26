
'use strict';

/**
 * Variables
 *
 * @type {React}
 */
const React = require('react');
const ReactDOM = require('react-dom');
const promise = require('./promise.js');
const client = require('./client');
const follow = require('./follow');
const semantic = require('semantic-ui-react');
const toastr = require('toastr');
const fetcher = require('whatwg-fetch');
const root = '/api';

/**
 * Import statements, This project uses Semantic UI React stylesheet.
 */
import 'semantic-ui-css/semantic.min.css';
import {Icon, Label, Menu, Table, Segment, Input,
    Button, Popup, Grid, Header, Modal} from 'semantic-ui-react'

/**
 * One row represents a single rectangle as (x1,y1), (x2,y2) or the
 * coordinates of the bottom left corner and top right corner. From that
 * everything else can be derived, which would be a good test of the java
 * backend.
 */
class Row extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            display: true,
            edit: false,
        };
        this.handleDelete = this.handleDelete.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }

    render() {
        if (this.state.display === false) return null;
        if (this.state.edit === true) {
            return (
               <Table.Row>
                   <Table.Cell>
                       <Input fluid type='text' placeholder={
                           this.props.customRectangle.x1}/>
                   </Table.Cell>
                   <Table.Cell>
                       <Input fluid type='text' placeholder={
                           this.props.customRectangle.y1}/>
                   </Table.Cell>
                   <Table.Cell>
                       <Input fluid type='text' placeholder={
                           this.props.customRectangle.x2}/>
                   </Table.Cell>
                   <Table.Cell>
                       <Input fluid type='text' placeholder={
                           this.props.customRectangle.y2}/>
                   </Table.Cell>
                   <Table.Cell>
                       <Button.Group>
                           <Button onClick={this.handleCancel}>Cancel</Button>
                           <Button.Or />
                           <Button positive onClick={this.handleSave}>
                               Save
                           </Button>
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
                    <Button onClick={this.handleUpdate}>
                        Edit
                    </Button>
                    <Button secondary onClick={this.handleDelete}>
                        Remove
                    </Button>
                </Table.Cell>
            </Table.Row>
        );
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

    handleCancel() {
        var self = this;
        this.setState({edit: false});
    }

    handleUpdate() {
        var self = this;
        this.setState({edit: true});
    }

    handleSave() {
        //TODO: implement method
        var self = this;
        this.setState({edit: false});
    }
}

/**
 * 'this.props.customRectangles' is transformed from an array of customRectangle
 * records into an array of <Element /> React components.
 */
class RectangleList extends React.Component {
    constructor(props) {
       super(props);
       this.handleAdd = this.handleAdd.bind(this);
    }

    render() {
        var customRectangles = this.props.customRectangles.map(
            customRectangle =>
                <Row key={customRectangle._links.self.href}
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
                                   <Modal trigger={<Button icon='add'
                                                        onClick={this.handleAdd}/>}>
                                       <Modal.Header>Add Rectangle</Modal.Header>
                                       <Modal.Content>
                                           <Modal.Description>
                                               <Header>Enter Values</Header>
                                               <Input focus placeholder='x1'/>
                                               <Input focus placeholder='y1'/>
                                               <Input focus placeholder='x2'/>
                                               <Input focus placeholder='y2'/>
                                           </Modal.Description>
                                       </Modal.Content>
                                       <Modal.Actions>
                                           <Button primary
                                                   onClick={this.handleAdd}>
                                               Add
                                           </Button>
                                       </Modal.Actions>
                                   </Modal>
                               </Table.HeaderCell>
                               <Table.HeaderCell>
                                   <Button onClick={this.handleEditAll}>
                                       Edit All
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

    handleAdd() {
        var self = this;
        let data = {
            x1: 1,
            y1: 1,
            x2: 1,
            y2: 1
        }
        $.ajax({
            url: "http://localhost:8080/api/customRectangles/add",
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            cache: false,
            data: JSON.stringify(data),
            success: function(response){
                alert('successful');
                //TODO: add here
            },
            error: function(){
                alert('Error in request..');
                console.log("data =" + JSON.stringify(data));
            }
        });
    }

    handleEditAll() {
        //TODO: implement function
    }
}

/**
 * Gets the data from the REST endpoint.
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

/*
 * Replaces the ReactDOM.render with the App class.
 */
ReactDOM.render(
    <App />,
    document.getElementById("root")
);

