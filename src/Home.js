import React, { Component } from 'react';

class Home extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                This is the home page
                {this.props.user}
            </div>
        );
    }
}

export default Home;