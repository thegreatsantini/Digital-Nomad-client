import React, { Component } from 'react';
import axios from 'axios';
import { SERVER_URL } from './constants';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Navigation from './layout/Navigation'
import Login from './auth/Login';
import SignUp from './auth/SignUp';
import Home from './Home';
import './App.css';
import AddressBook from './AddressBook';
import Profile from './Profile'


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      name: null,
      id: null,
      savedContacts: []
    }
  }

  componentDidMount = () => {
    this.getUser();
  }

  getUser = () => {
    // get user
    let token = localStorage.getItem('loginToken');
    if (token) {
      // there is a token in localStorage; validate it
      axios.post(SERVER_URL + '/auth/me/from/token', {
        headers: { 'Authorization': `Bearer ${token}` }
      })
        .then(response => {
          // console.log("User ", response.data.user)
          this.setState({
            user: response.data.user,
            name: response.data.user.name,
            id: response.data.user._id,
            savedContacts: response.data.user.contacts
          });
        })
        .catch(err => {
          console.log('error:', err);
          localStorage.removeItem('loginToken');
          this.setState({
            user: null
          })
        });
    }
    else {
      console.log('No token was found');
      localStorage.removeItem('loginToken');
      this.setState({
        user: null
      })
    }
  }
  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <div >
              <Navigation user={this.state.user} updateUser={this.getUser} />
              <Route path='/addressbook' component={() => (<AddressBook savedContacts={this.state.savedContacts} updateUser={this.getUser} userID={this.state.id} />)} />
              <Route path="/login" component={() => (<Login user={this.state.user} updateUser={this.getUser} />)} />

              <Route path="/profile" component={() => (<Profile currentUser={this.state.user} userID={this.state.id} updateUser={this.getUser} />)} />
              
              <Route path="/signup" component={() => (<SignUp user={this.state.user} updateUser={this.getUser} />)} />
              <Route exact path='/' component={() => (<Home _id={this.state.id} name={this.state.name} updateUser={this.getUser} savedContacts={this.state.savedContacts} />)} />

            </div>
          </div>
        </Router>
      </div>
    );
  }
};