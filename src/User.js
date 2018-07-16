import React from "react";
import Axios from "axios";
import { SERVER_URL } from 'constants';

class User extends React.Component {

    componentDidMount = () => {
        Axios.get(SERVER_URL + '/profile').then((data) => console.log(data))
    }
    render() {
        return (<div>
                    URL: {SERVER_URL}
                </div>)
    }

}

export default User;  