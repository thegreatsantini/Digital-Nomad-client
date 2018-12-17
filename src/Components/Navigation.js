import React from 'react';
import { Link } from 'react-router-dom';
// import '../nav.css';
import { Navbar, NavItem, Nav } from 'react-bootstrap';




export default ({ user, updateUser }) =>  {

    const handleLogout = (e) => {
        e.preventDefault();
        localStorage.removeItem('loginToken');
        updateUser();
        // used to be this.updateUser()
    }
    
        return (
            <Navbar inverse collapseOnSelect>
                <Navbar.Header>
                    <Navbar.Brand>
                        <Link to='/'>Digital Nomad</Link>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav>
                        <NavItem eventKey={1} onClick={handleLogout} >
                            {user ? <a onClick={handleLogout}>Logout</a> : <Link to="/login">Login</Link>}
                        </NavItem>
                        <NavItem eventKey={2}>
                            {user ? <Link to="/profile">Profile</Link> : <Link to="/signup">Sign up</Link>}
                        </NavItem>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }