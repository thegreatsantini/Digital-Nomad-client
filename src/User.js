import React from "react";
// import Axios from "axios";
// import { SERVER_URL } from 'constants';

class User extends React.Component {

    componentDidMount = () => {
        console.log(this.props.user)
    };
    
    render() {
        return (
            <div>
                Home Component
                { this.props.user }
            </div>)
    }

}

export default User;  