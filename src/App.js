import React, { Component } from 'react';
import axios from 'axios';
import { SERVER_URL } from './constants';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Nav from './layout/Nav'
import Login from './auth/Login';
import SignUp from './auth/SignUp';
import Home from './Home';
import UserProfile from './User'
import './App.css';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null
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
            user: response.data.user
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
            <div className="container">
              <Nav user={this.state.user} updateUser={this.getUser} />

              <Route path="/user" component={UserProfile} />
              <Route path="/login" component={() => (<Login user={this.state.user} updateUser={this.getUser} />)} />
              <Route path="/signup" component={() => (<SignUp user={this.state.user} updateUser={this.getUser} />)} />
              <Route exact path='/' component={() => (<Home user={this.state.user} updateUser={this.getUser}  />)} />
            </div>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
