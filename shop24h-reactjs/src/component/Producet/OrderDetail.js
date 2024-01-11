
import { Col, Row } from "reactstrap";
import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Button, Typography } from '@mui/material';

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
  }


const OrderDetail = ({ nameProp, priceProp, img, buyProp, id }) => {

    return (
       
            <Col className="col-sm-3 p-2" style={{display: "grid", justifyContent:" space-around"}}>
                <Card sx={{ width: 200, textAlign: "center",  height: 300}}>
                    <a href={"/product/" + id} >
                        <CardMedia
                            component="img"
                            height="200"
                            image={img}
                            alt="green iguana"
                        />
                    </a>

                    <CardContent >
                        <Typography gutterBottom variant="h6" component="div">
                            <b>
                                {nameProp}
                            </b>
                        </Typography>
                        <Row mt={2}>
                            <Typography variant="h8" color="text.secondary">
                                <strike style={{ color: "red" }}> {numberWithCommas(buyProp)} VNĐ  </strike> &nbsp; {numberWithCommas(priceProp)}  VNĐ
                            </Typography>
                        </Row>
                    </CardContent>
                </Card>
            </Col>
    )
}

export default OrderDetail;