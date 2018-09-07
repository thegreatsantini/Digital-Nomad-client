import React, { Component } from 'react';
import Axios from 'axios';
import { SERVER_URL } from '../constants';
import PostCardsThumbnails from './PostCardsThumbnails';
import { Row,  Grid } from 'react-bootstrap';

export default class SentPostCards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editUser: false,
      cards: []
    };
  }

  renderCards = async (data) => {
    return (
      data[0].imgUrl
    )
  }

  // componentWillReceiveProps should be used maybe??
  componentDidMount = async () => {
    let token = localStorage.getItem('loginToken');
    const fetchSentCards = await Axios.get(`${SERVER_URL}/postcards/api/v1/${this.props.userID}`,
      { 'headers': { 'Authorization': `Bearer ${token}` } })
    this.setState({ cards: fetchSentCards.data });


  };

  render() {
    return (
      <div>
        <Grid>
          <Row>
            {this.state.cards.length < 1 ? "Loading..." : <PostCardsThumbnails cards={this.state.cards} />}
          </Row>
        </Grid>
      </div>
    )
  }
};
