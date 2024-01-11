
import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import LinearProgress from '@mui/material/LinearProgress';
import { Grid, Pagination, Typography, Button, } from '@mui/material';
import OrderDetail from '../../Producet/OrderDetail';
import { useEffect, useState } from "react"
import { Row, Col } from 'react-bootstrap';

//Sản phẩm bán chạy

import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
function LastestProducts() {
    const [clockList, setCloclName] = useState([])
    const [limit, setLimit] = useState(8);
    const [page, setPage] = useState(1);
    const [noPage, setNoPage] = useState(0);

    //Pagination
    const changePageHandler = (event, value) => {
        setPage(value)
    }

    const fetchAPI = async (url) => {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    }


    useEffect((data) => {
        fetchAPI("http://localhost:8000/product")
            .then((data) => {
                setNoPage(Math.ceil(data.data.length / limit));

                setCloclName(data.data.slice((page - 1) * limit, page * limit));
                console.log(data);
            })
            .catch((error) => {
                console.error(error.message);
            })
    }, [limit, page]);
    const itemData = [
        {
            img: 'https://cdn.shopdongho.com/2018/09/dong-ho-casio-1.png',
            title: 'Breakfast',
        },
        {
            img: 'https://cdn.shopdongho.com/2018/09/dong-ho-ediffice.png',
            title: 'Burger',
        },
        {
            img: 'https://cdn.shopdongho.com/2018/09/dong-ho-g-stock.png',
            title: 'Camera',
        },
        {
            img: 'https://cdn.shopdongho.com/2018/09/dong-ho-sheen.png',
            title: 'Coffee',
        },
        {
            img: 'https://cdn.shopdongho.com/2019/03/dong-ho-casio-ltp.png',
            title: 'Coffee',
        },
        {
            img: 'https://cdn.shopdongho.com/2019/03/dong-ho-casio-mtp.png',
            title: 'Coffee',
        },
        {
            img: 'https://cdn.shopdongho.com/2018/09/dong-ho-sheen.png',
            title: 'Coffee',
        },
        {
            img: 'https://cdn.shopdongho.com/2020/04/logo-thuong-hieu-dong-ho-julius-1.png',
            title: 'Coffee',
        },
        {
            img: 'https://cdn.shopdongho.com/2018/09/dong-ho-ogival.png',
            title: 'Coffee',
        },
        {
            img: 'https://cdn.shopdongho.com/2018/09/dong-ho-orient-1.png',
            title: 'Coffee',
        },
        {
            img: 'https://cdn.shopdongho.com/2020/02/logo-dong-ho-olympia-star-1.png',
            title: 'Coffee',
        },
        {
            img: 'https://cdn.shopdongho.com/2018/09/dong-ho-tisot.png',
            title: 'Coffee',
        },
        {
            img: 'https://cdn.shopdongho.com/2018/09/dong-ho-seiko.png',
            title: 'Coffee',
        },
        {
            img: 'https://cdn.shopdongho.com/2018/09/dong-ho-daniel-wellington.png',
            title: 'Coffee',
        },
        {
            img: 'https://cdn.shopdongho.com/2020/02/logo-dong-ho-olym-pianus.png',
            title: 'Coffee',
        },
        {
            img: 'https://cdn.shopdongho.com/2018/09/dong-ho-louis-erard.png',
            title: 'Coffee',
        },
        {
            img: 'https://cdn.shopdongho.com/2020/02/logo-dong-ho-skagen.png',
            title: 'Coffee',
        },
        {
            img: 'https://cdn.shopdongho.com/2019/03/dong-ho-mvmt.png',
            title: 'Coffee',
        },
    ];
    return (
        <Grid className='container'>
            <Grid mt={7}>
                <Row>
                    {itemData.map((image) => (
                        <Col className="p-1">
                            <a href='/product' sx={{ color: "black" }}>
                                <img src={image.img} alt='1' style={{ width: "90px", background: "black" }} />
                            </a>
                        </Col>
                    ))}
                </Row>
                <Row style={{ marginTop: "20px" }}>
                    <Grid container style={{ display: "flex", alignItems: "center" }}>
                        <Grid className="col-3">
                            <LinearProgress color="success" />
                        </Grid>
                        <Grid className="col-6">
                            <h2 className='text-center border-warning text-danger'>
                                Sản phẩm bán chạy nhất
                            </h2></Grid>
                        <Grid className="col-3"><LinearProgress color="success" /> </Grid>

                    </Grid>
                    {clockList.map((clock, index) => {
                        return (
                            <OrderDetail key={index} nameProp={clock.name} priceProp={clock.promotionPrice} img={clock.imageUrl} buyProp={clock.buyPrice} id={clock._id} />
                        )
                    })}
                </Row>

                <Grid container justifyContent="end">
                    <Grid item>
                        <Pagination color="secondary"
                            count={noPage} defaultPage={page} onChange={changePageHandler}>
                        </Pagination>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default LastestProducts;