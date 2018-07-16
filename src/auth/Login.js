import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { SERVER_URL } from '../constants';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        };
    }

    handleEmailChange = (e) => { this.setState({ email: e.target.value }); }
    handlePasswordChange = (e) => { this.setState({ password: e.target.value }); }

    handleSubmit = (e) => {
        e.preventDefault();
        axios.post(SERVER_URL + '/auth/login', this.state)
            .then(result => {
                console.log('Success', result.data);
                // add newly-received token to localStorage
                localStorage.setItem('loginToken', result.data.token);
                // update user with a call to App.js
                this.props.updateUser();
            })
            .catch(err => { console.log('Error', err.response.data); });
    }

    render() {
        if (this.props.user) {
            return (<Redirect to="/" />);
        }

        return (
            <div>
                <br />
                <h2>Log into your account</h2><br />
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label>Email</label>
                        <input value={this.state.email} onChange={this.handleEmailChange} type="text" name="email" className="form-control" placeholder="Email goes here" />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input value={this.state.password} onChange={this.handlePasswordChange} type="password" name="password" className="form-control" placeholder="Secret things go here" />
                    </div>
                    <input type = "submit" value = "Log me in!" className="btn btn-success" />
                </form>
            </div>
        );
    }
}

export default Login;