import React, { Component } from 'react';
import { ListGroup, ListGroupItem, Button } from 'react-bootstrap';
import SentPostCards from '../Containers/SentPostCards';
import { Redirect } from 'react-router-dom'

export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editUser: false,

        };
    }

    renderProfilePage = () => {
        return (
            <React.Fragment>
                {/* <Image src={ testProfile } rounded alt='avatar' /> */}
                < ListGroup >
                    <ListGroupItem>Name: {this.props.name} </ListGroupItem>
                    <ListGroupItem>Email: {this.props.email} </ListGroupItem>
                    <ListGroupItem> 'other stuff' </ListGroupItem>
                </ListGroup >
                <Button
                    bsStyle="info"
                    onClick={() => this.setState({ editUser: true })}
                >
                    Update Info
                </Button>
                <SentPostCards 
                    userId={this.props.id} 
                />
            </React.Fragment>
        );
    }

    renderLoading = () => {
        return (
           <Redirect to='/' />
        )
    }


    render() {
        return (
            <React.Fragment>
                {
                    this.props.id
                    ? this.renderProfilePage()
                    : this.renderLoading()
                }
            </React.Fragment>
        )
    }
}