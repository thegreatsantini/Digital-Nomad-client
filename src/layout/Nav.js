import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../nav.css';
class Nav extends Component {
    constructor(props) {
        super(props);
        this.state = { active: false };
    }

    click() {
        this.setState({ active: true });
    }

    handleLogout = (e) => {
        console.log('logging out...');
        e.preventDefault();
        localStorage.removeItem('loginToken');
        this.props.updateUser();
    }

    render() {
        let links = '';
        if (this.props.user) {
            links = (
                <span>
                    <Link to="/">Home</Link>
                    <a onClick={this.handleLogout}>Logout</a>
                    <Link to="/profile">Profile</Link>
                </span>
            );
        }
        else {
            links = (
                <div>
                    <Link to="/">Home</Link>
                    <Link to="/login">Login</Link>
                    <Link to="/signup">Sign up</Link>
                </div>
            );
        }

        return (
            <div id="header">
                <div id="container">
                    <div id="logo">
                        <Link className='logo' to='/'>Brand</Link> 
                    </div>
                    <div id="header-button">
                        <svg id="header-menu-svg" height="50" width="25" viewBox="0 0 12 16" version="1.1" aria-hidden="true">
                            <path fill-rule="evenodd" d="M11.41 9H.59C0 9 0 8.59 0 8c0-.59 0-1 .59-1H11.4c.59 0 .59.41.59 1 0 .59 0 1-.59 1h.01zm0-4H.59C0 5 0 4.59 0 4c0-.59 0-1 .59-1H11.4c.59 0 .59.41.59 1 0 .59 0 1-.59 1h.01zM.59 11H11.4c.59 0 .59.41.59 1 0 .59 0 1-.59 1H.59C0 13 0 12.59 0 12c0-.59 0-1 .59-1z"></path>
                        </svg>
                    </div>
                            {links}
                    </div>
                    </div>
                    );
                }
            }
            
export default Nav;