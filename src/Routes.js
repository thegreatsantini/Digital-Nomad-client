import React from "react";
import { Route, Switch } from "react-router-dom";
import Login from './auth/Login';
import SignUp from './auth/SignUp';
import Home from './Containers/Home';
import Profile from './Containers/Profile';
import EditContactForm from './Components/EditContactForm';
import SandBox from './SandBox';
import AppliedRoute from './Components/AppliedRoute';
import NotFound from './Components/NotFound';


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
