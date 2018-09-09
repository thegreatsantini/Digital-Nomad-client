import React, { Component } from 'react';
import Axios from 'axios';
import { SERVER_URL } from '../constants';
import { Form, FormControl, ControlLabel, Button, FormGroup } from 'react-bootstrap';
import '../testProfile.jpg'

export default class EditProfileForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newName: '',
            newEmail: '',
        };
    }

    changeProfileInfo = async (e) => {
        e.preventDefault();

        const newInfo = await Axios.put(`${SERVER_URL}/profile/api/v1/user/${this.props.userID}/edit/${this.state.newEmail}${this.state.newName}`)
        console.log(newInfo)
        this.props.updateUser()
    }

    handleChange = event => {
        this.setState({
        [event.target.id] : event.target.value,
        });
    };
        
    componentDidMount = () => {
        console.log('edit form', this.props.user)
    };
            
    render() {
        // const user = this.props.user || '';

        return (
            <div> 
                <Form inline>
                    <FormGroup controlId="newName">
                        <ControlLabel>New Name</ControlLabel>{' '}
                        <FormControl 
                            type="text" 
                            placeholder={this.props.user.name}
                            onChange={this.props.handleChange}
                            />
                    </FormGroup>{' '}
                    <FormGroup controlId="newEmail">
                        <ControlLabel>New Email</ControlLabel>{' '}
                        <FormControl 
                            type="email" 
                            placeholder={ this.props.user.email }
                            onChange={this.props.handleChange}
                            />
                    </FormGroup>{' '}
                    <Button 
                        type="submit"
                        onSubmit={this.ChangeProfileInfo}
                    >
                        Send invitation
                    </Button>
                </Form>
            </div>
            )
        
        
    }
}
