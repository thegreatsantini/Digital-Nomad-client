import React, { Component } from 'react';
import axios from 'axios';
import Navigation from './Components/Navigation'
import Routes from "./Routes";


import './App.css';



export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      name: null,
      id: null,
      savedContacts: [],
      email: ''
    }
  }

  componentDidMount = async() => {
    this.getUser();
  }

  getUser = () => {
    // get user
    let token = localStorage.getItem('loginToken');

    if (token) {
      // there is a token in localStorage; validate it
      axios.post(process.env.REACT_APP_DEV_SERVER + '/auth/me/from/token', {
        headers: { 'Authorization': `Bearer ${token}` }
      })
        .then(response => {
          this.setState({
            user: response.data.user,
            name: response.data.user.name,
            id: response.data.user._id,
            savedContacts: response.data.user.contacts,
            email: response.data.user.email
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
        id: null
      })
    }
  }

  handleLogout = (e) => {
    console.log('logging out...');
    e.preventDefault();
    localStorage.removeItem('loginToken');
    this.props.updateUser();
  }

  render() {
    const childProps = {
      name: this.state.name,
      id: this.state.id,
      savedContacts: this.state.savedContacts,
      updateUser: this.getUser,
      email: this.state.email,
    };
    return (
      <div className="App">
        <Navigation user={this.state.id} updateUser={this.getUser} />
        <Routes childProps={childProps} />
      </div>
    );
  }
};
