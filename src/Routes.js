import React from "react";
import { Route, Switch } from "react-router-dom";
import Login from './auth/Login';
import SignUp from './auth/SignUp';
import Home from './Components/Home';
import AddressBook from './Components/AddressBook';
import Profile from './Components/Profile';
import EditContactForm from './Components/EditContactForm';
import SandBox from './SandBox';
import AppliedRoute from './Components/AppliedRoute';
import NotFound from './Containers/NotFound';


export default ({ childProps }) => 
    
    <Switch>
        <AppliedRoute path="/" exact component={Home} props={childProps}  />
        
        <AppliedRoute path="/profile" component={Profile} props={childProps} />
        <AppliedRoute path="/login" component={Login} props={childProps} />
        <AppliedRoute path="/signup" component={SignUp} props={childProps} />
        
        <AppliedRoute path="/contacts/edit/" component={EditContactForm} props={childProps} />
        <AppliedRoute path='/sandbox' component={() => (<SandBox userID={this.state.id} updateUser={this.getUser} />)} />
        { /* Finally, catch all unmatched AppliedRoutes */}
        <Route component={NotFound} />
    </Switch>;
