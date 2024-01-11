import { useEffect, useState } from "react"
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Button } from "reactstrap";
import OrderDetail from "./OrderDetail";
import { Pagination, Grid } from '@mui/material';
import FilterProduct from "./filterProduct"
import { useDispatch, useSelector } from "react-redux"
import MageListShop from '../Header/Appbavsicon/imageListShop'

function ProductsListShop() {

    const [clockList, setCloclName] = useState([])
    const [limit, setLimit] = useState(8);
    const [page, setPage] = useState(1);
    const [noPage, setNoPage] = useState(0);
    const { nameInput, minInput, maxInput, type, sanpham } = useSelector((reduxData) => reduxData.taskReducer);

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
        if (minInput == 0 && maxInput == 0 && nameInput == "" && type == "") {
            fetchAPI(`http://localhost:8000/product`)
                .then((data) => {
                    setNoPage(Math.ceil(data.data.length / limit));
                    setCloclName(data.data.slice((page - 1) * limit, page * limit));
                    console.log(data);
                    setPage(1);
                })
                .catch((error) => {
                    console.error(error.message);
                })
        }

        else {
            fetchAPI(`http://localhost:8000/product/?name=${nameInput}&minpromotionPrice=${minInput}&maxpromotionPrice=${maxInput}&type=${type}`)
                .then((data) => {
                    setNoPage(Math.ceil(data.data.length / limit));
                    setCloclName(data.data.slice((page - 1) * limit, page * limit));
                    setPage(1);
                    console.log(data);
                })
                .catch((error) => {
                    console.error(error.message);
                })
        }


    }, [limit, page, nameInput, maxInput, minInput, type]);

    // sử lý sự kiện Filter sản phẩm
    const itemData = [
    {
      img: 'https://cdn.shopdongho.com/2019/01/dong-ho-hot-1.jpg',
      title: 'Breakfast',
    },
    {
      img: 'https://cdn.shopdongho.com/2019/01/dong-ho-co-1.jpg',
      title: 'Burger',
    },
    {
      img: 'https://cdn.shopdongho.com/2019/01/dong-ho-pin.jpg',
      title: 'Camera',
    },
    {
      img: 'https://cdn.shopdongho.com/2019/01/dong-ho-doi.jpg',
      title: 'Coffee',
    },

  ];
    return (
        <>
            <Container className="mt-3">
             
                <Row>
                    <Row>
                        <FilterProduct />
                    </Row>
                    <Col>
                        <Col>
                            <Row style={{ marginTop: "50px" }}>

                                {clockList.map((clock, index) => {
                                    return (
                                        <OrderDetail md={3} sm={6} key={index} nameProp={clock.name} priceProp={clock.promotionPrice} img={clock.imageUrl} buyProp={clock.buyPrice} id={clock._id} />
                                    )
                                })}

                            </Row>
                        </Col>
                    </Col >

                    <Grid container justifyContent="end">
                        <Grid >
                            <Pagination color="secondary"
                                count={noPage} defaultPage={page} onChange={changePageHandler}>
                            </Pagination>
                        </Grid>
                    </Grid>
                </Row>
                <MageListShop/>

            </Container>
        </>

    )
}
export default ProductsListShop