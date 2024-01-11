import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { Grid, Card } from '@mui/material';
import { Col, Row } from "reactstrap";
import CardMedia from '@mui/material/CardMedia';
function MageListShop() {

  return (
    <div className='container'>


      <Grid container>

        <Col className="col-sm-6 p-2">
          <img src='https://cdn.shopdongho.com/2018/12/banner-dong-ho-nam.jpg' alt='dong ho co' style={{ width: "100%", height: "200px" }} />
        </Col>
        <Col className="col-sm-6 p-2">
          <img src='https://cdn.shopdongho.com/2019/07/dong-ho-nu-new-1.png' alt='dong ho so' style={{ width: "100%", height: "200px" }} />
        </Col>
      </Grid >

      <Row>
        <Col className="col-sm-3" style={{ display: "grid", justifyContent: " space-around",  marginTop: "15px"  }}>
          <Card sx={{ width: 230, textAlign: "center"}}>
            <CardMedia
              component="img"
              height="230"
              image='https://cdn.shopdongho.com/2019/01/dong-ho-hot-1.jpg'
              alt="green iguana"
            />
          </Card>
        </Col>
        <Col className="col-sm-3" style={{ display: "grid", justifyContent: " space-around",     marginTop: "15px" }}>
          <Card sx={{ width: 230, textAlign: "center"}}>
            <CardMedia
              component="img"
              height="230"
              image='https://cdn.shopdongho.com/2019/01/dong-ho-co-1.jpg'
              alt="green iguana"
            />
          </Card>
        </Col>
        <Col className="col-sm-3" style={{ display: "grid", justifyContent: " space-around", marginTop: "15px" }}>
          <Card sx={{ width: 230, textAlign: "center"}}>
            <CardMedia
              component="img"
              height="230"
              image='https://cdn.shopdongho.com/2019/01/dong-ho-pin.jpg'
              alt="green iguana"
            />
          </Card>
        </Col>
        <Col className="col-sm-3" style={{ display: "grid", justifyContent: " space-around", marginTop: "15px" }}>
          <Card sx={{ width: 230, textAlign: "center"}}>
            <CardMedia
              component="img"
              height="230"
              image='https://cdn.shopdongho.com/2019/01/dong-ho-doi.jpg'
              alt="green iguana"
            />
          </Card>
        </Col>
      </Row>

    </div >
  );
}

export default MageListShop