import React, { Component } from 'react';
import { Col, Row, Thumbnail, Grid } from 'react-bootstrap';
import ThumbnailModal from './ThumbnailModal';

export default ({ cards }) => {
    
          const formattedCards = cards.map((val, i )=> {
            return (
              <Col xs={6} md={4}>
                <Thumbnail src={val.imgUrl} alt="242x200">
                    <ThumbnailModal 
                      message={val.message} 
                      recipients={val.recipients} 
                      />
                </Thumbnail>
              </Col>
            )
          })
            return (
            <div>
              <Grid>
                <Row>
                  {formattedCards}
                </Row>
              </Grid>
            </div>
            )
    };
