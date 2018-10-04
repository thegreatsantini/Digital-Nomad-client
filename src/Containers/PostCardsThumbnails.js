import React from 'react';
import { Col, Row, Thumbnail, Grid, Button, Glyphicon } from 'react-bootstrap';
import ThumbnailModal from './ThumbnailModal';

const button__container = {
  display: "flex",
  justifyContent: "space-evenly",
}

export default ({ cards, handleRemove }) => {
    
  
          const formattedCards = cards.map((val, i )=> {
            return (
              <Col xs={6} md={4}>
                <Thumbnail src={val.imgUrl} alt="242x200">
                <div style={button__container} >
                    <ThumbnailModal 
                      message={val.message} 
                      recipients={val.recipients}
                      location={val.location}
                      />
                <Button onClick={(e) => handleRemove(e, val._id)} bsSize="small">
                    <Glyphicon glyph="trash" />
                </Button>
                </div>
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
