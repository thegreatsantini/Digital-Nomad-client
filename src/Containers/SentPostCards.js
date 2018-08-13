import React, { Component } from 'react';
import Axios from 'axios';
import { SERVER_URL } from '../constants';
import PostCardsThumbnails from './PostCardsThumbnails';
import { Col, Image, Row, Thumbnail, Button, Grid } from 'react-bootstrap';

export default class SentPostCards extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editUser : false,
            cards: []
        };
    }

    renderCards = async (data) => {
      console.log('thing',data[0])
      return (
        data[0].imgUrl
      )
    }

    // componentWillReceiveProps should be used maybe??
    componentDidMount = async () => {
      console.log(this.state.cards)
        const fetchSentCards = await Axios.get(`${SERVER_URL}/postcards/api/v1/${this.props.userID}`)
        console.log('jjjj',fetchSentCards.data)
        // this.renderCards(fetchSentCards.data);
        this.setState({ cards: fetchSentCards.data}, ()=> console.log(this.state.cards));


    };

    render() {
      const thing = this.state.cards || ''
        const user = this.props.currentUser || '';
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
