import React, { Component } from 'react';
import { ListGroup, ListGroupItem, Button } from 'react-bootstrap';
import EditProfileForm from './EditProfileForm'
import SentPostCards from '../Containers/SentPostCards';
export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editUser: false,

        };
    }


    renderProfilePage = () => {
        console.log(this.props)
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
                <SentPostCards userID={this.props.userID} />
            </React.Fragment>
        );
    }


    render() {
        return (
            <React.Fragment>
                {this.props.id
                    ? this.renderProfilePage()
                    : this.renderLoading()
                }
            </React.Fragment>
        )
    }
}

{/* <EditProfileForm 
                    changeProfileInfo={this.changeProfileInfo} 
                    user={this.props.currentUser} 
                    handleChange={this.handleChange} 
                    /> */}