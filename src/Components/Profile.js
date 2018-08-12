import React, { Component } from 'react';
import Axios from 'axios';
import { SERVER_URL } from '../constants';
import { Col, Image, ListGroup, ListGroupItem, Button } from 'react-bootstrap';
import EditProfileForm from '../Forms/EditProfileForm'
import testProfile from '../testProfile.jpg'
import SentPostCards from '../Containers/SentPostCards';
export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editUser : false,
            
        };
    }

    

    // componentWillReceiveProps should be used maybe??    
    componentDidMount = async () => {
        
    };
            
    render() {
        const user = this.props.currentUser || '';

        if ( !this.state.editUser ) {
        return (
            <div>
                {/* <Image src={ testProfile } rounded alt='avatar' /> */}
                <ListGroup>
                    <ListGroupItem>Name: {user.name} </ListGroupItem>
                    <ListGroupItem>Email: {user.email} </ListGroupItem>
                    <ListGroupItem> 'other stuff' </ListGroupItem>
                </ListGroup>
                <Button 
                    bsStyle="info"
                    onClick={() => this.setState({ editUser: true })}
                    >
                    Update Info
                </Button>
                <SentPostCards userID={this.props.userID} />
            </div>
            )
        } 
        else {
            return (
            <div>
                <EditProfileForm 
                    changeProfileInfo={this.changeProfileInfo} 
                    user={this.props.currentUser} 
                    handleChange={this.handleChange} 
                    />
            </div>
            )
        }
    }
}
