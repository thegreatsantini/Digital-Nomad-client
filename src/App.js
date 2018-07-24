import React, { Component } from 'react';
import axios from 'axios';
import { SERVER_URL } from './constants';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Navigation from './layout/Navigation'
import Login from './auth/Login';
import SignUp from './auth/SignUp';
import Home from './Home';
import User from './User'
import './App.css';
import AddressBook from './AddressBook';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      name: null,
      id: null,
      saved: null
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
          console.log("response.data in getUser() is ", response.data)
          this.setState({
            user: response.data.user,
            name:response.data.user.name,
            id: response.data.user.id,
            save: response.data.user.saved
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
              <Route path='/addressbook' component={()=> (<AddressBook savedContacts={this.state.saved} updateUser={this.getUser}/>)} />
              <Route path="/user" component={() => (<User user={this.state.user} updateUser={this.getUser} />)} />
              <Route path="/login" component={() => (<Login user={this.state.user} updateUser={this.getUser} />)} />
              <Route path="/signup" component={() => (<SignUp user={this.state.user} updateUser={this.getUser} />)} />
              <Route exact path='/' component={() => (<Home name={this.state.name} updateUser={this.getUser}  />)} />
            </div>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
