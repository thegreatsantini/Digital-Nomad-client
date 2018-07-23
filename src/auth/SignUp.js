import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { SERVER_URL } from '../constants';

class AmbassadorRegistration extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: ''
        };
    }

    handleNameChange = (e) => {
        this.setState({ name: e.target.value })
        }
    }

    handleEmailChange = (e) => { this.setState({ email: e.target.value }); }
    handlePasswordChange = (e) => { this.setState({ password: e.target.value }); }
    handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted');

        axios.post(SERVER_URL + '/auth/signup', this.state)
            .then(result => {
                console.log('Successfully added user to db');
                // add newly-received token to localStorage
                localStorage.setItem('loginToken', result.data.token);
                // update user with a call to App.js
                this.props.updateUser();
            })
            .catch(err => { console.log('Error:', err) })
    }

    render() {
    console.log('here')

        if (this.props.user) { return (<Redirect to="/" />); }

        return (
            <div>
                <br />
                <h3>Sign up to get started</h3>
                <br />
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <input name="Name" placeholder="Name" value={this.state.name} onChange={this.handleNameChange} />
                    </div>
                    <div>
                        <input name="Email" placeholder="Email address" value={this.state.email} onChange={this.handleEmailChange} />
                    </div>
                    <div>
                        <input name="Password" type="password" value={this.state.password} onChange={this.handlePasswordChange} />
                    </div>
                    <input type="submit" value="Sign up" className="button" />
                </form>
            </div>
        )
    }
}

export default AmbassadorRegistration;