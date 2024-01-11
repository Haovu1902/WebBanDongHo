import { Container, Grid, CardMedia, CardContent, Typography, Button, Rating, ButtonGroup, Pagination, Snackbar, Alert } from "@mui/material"
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom"
import LinearProgress from '@mui/material/LinearProgress';
import { Row, Col } from "reactstrap";
import AddShoppingCartSharpIcon from '@mui/icons-material/AddShoppingCartSharp';
import { connect, useDispatch, useSelector } from "react-redux"

import OrderDetail from "./Producet/OrderDetail";
import ModalOrderChitie from "./Giohang/OrderChitiet";




function ProductDitail() {

    const { id } = useParams()
    const [product, setProduct] = useState({});
    const fetchAPI = async (url) => {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    }
    useEffect((data) => {

        fetchAPI("http://localhost:8000/product/" + id)
            .then((data) => {
                setProduct(data.data)
                console.log(data);
            })
            .catch((error) => {
                console.error(error.message);
            })
    }, [id]);
    // danh mục san phẩm
    const [clockList, setCloclName] = useState([])
    const [limit, setLimit] = useState(8);
    const [page, setPage] = useState(1);
    const [noPage, setNoPage] = useState(0);
    const changePageHandler = (event, value) => {
        setPage(value)
    }
    const [quantity, setQuantity] = useState(1)

    const onThemClick = () => {
        setQuantity(quantity + 1)
    }
    const onTruClick = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1)
        }
        else setQuantity(1)


    }
    const [openAlert, setOpenAlert] = useState(false)
    const [noidungAlertValid, setNoidungAlertValid] = useState("")
    const handleCloseAlert = () => {
        setOpenAlert(false);

    }
    const dispatch = useDispatch();
    const themvaogiohang = () => {
        setOpenAlert(true)
        setNoidungAlertValid("Bạn đã thêm sản phẩm vào giỏ hàng thành công")
        dispatch({
            type: "THEM_VAO_GIO_HANG",
            value:
            {
                product: product,
                quantity: quantity

            }
        })
    }

    // phần xử lý đơn hang
    const [openModalAdd, setOpenModalAdd] = useState(false);
    const [closeModal, setCloseModal] = useState(false);
    const onClickMuahang = () => {
        setOpenModalAdd(true)
    }
    const handleClose = () => {
        setOpenModalAdd(false)
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
    ];

    return (
        <Container className="container">
            <Row style={{ marginTop: "70px" }} mt={5}  >
                < Col>
                    <Grid container style={{ justifyContent: "center" }}>
                        <Grid item>
                            <CardMedia
                                component="img"
                                height="300"
                                image={product.imageUrl}
                                alt="green iguana"
                            />
                        </Grid>
                        <Grid>
                            < CardContent   >
                                <Typography variant="h4" color="red" gutterBottom >{product.name}</Typography>
                                <Grid mt={2}>
                                    <Typography variant="h6">Giá: {product.promotionPrice} VNĐ </Typography>
                                </Grid>
                                <Grid mt={2}>
                                    <Typography variant="h6">Bảo hành: 12 tháng </Typography>
                                </Grid>
                                <Grid container mt={2}>
                                    <Typography variant="h6">Đánh giá:</Typography>
                                    <Rating name="half-rating" defaultValue={4} readOnly sx={{ alignItems: "center" }} />
                                </Grid>
                                <Grid container mt={2}>
                                    <Typography variant="h6" sx={{ marginRight: "10px" }}>Số lượng : </Typography>
                                    <ButtonGroup variant="contained" aria-label="outlined primary button group">
                                        <Button onClick={onTruClick}>-</Button>
                                        <Typography variant="h6">&nbsp;  {quantity} &nbsp;  </Typography>
                                        <Button onClick={onThemClick}>+</Button>
                                    </ButtonGroup>
                                </Grid>
                                <Grid container mt={2}>
                                    <Typography variant="h6">Tình trạng: Còn hàng</Typography>

                                </Grid>
                                <Grid container mt={2}>
                                    <Grid>
                                        <Button mt={2} sx={{ textAlign: "center", background: "#e5f5dc", color: "#e5bb0f" }} onClick={themvaogiohang}> <AddShoppingCartSharpIcon /> &nbsp; Thêm vào giỏ hàng </Button>
                                    </Grid>
                                    <Grid sx={{ marginLeft: "30px" }}>
                                        <Button sx={{ textAlign: "center", background: "#2196f3", color: "black" }} onClick={onClickMuahang}>Mua</Button>

                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Grid>
                    </Grid>
                    <Grid sx={{ textAlign: "center" }}>
                        <p>“Đồng hồ điện tử được biết đến là sản phẩm “độc quyền” đến từ thương hiệu A. watch. Nhờ thiết kế trẻ trung cùng giá
                            thành rẻ, đồng hồ điện tử chính hãng mặc nhiên trở thành sản phẩm ăn khách nhất và dẫn đầu về số lượng người
                            dùng không chỉ tại Việt Nam. Trên thực tế, sức “NÓNG” của dòng đồng hồ điện tử giá rẻ còn phụ thuộc vào hàng
                            loạt tính năng độc đáo được tích hợp riêng cho mỗi phiên bản. Điều này đã mang đến trải nghiệm mới hơn và nếu
                            chỉ có trên dưới 1 triệu đồng mà muốn sở hữu đồng hồ hiệu, giới trẻ chỉ có thể tìm đến đồng hồ điện tử mà thôi.”
                        </p>
                    </Grid>
                    <Row style={{ marginTop: "20px" }}>
                        {itemData.map((image) => (
                            <Col className="p-1">
                                <a href='/product' sx={{ color: "black" }}>
                                    <img src={image.img} alt='1' style={{ width: "90px", background: "black" }} />
                                </a>
                            </Col>
                        ))}
                    </Row>

                    <Grid style={{ marginTop: "20px" }}>
                    <Grid container style={{ display: "flex", alignItems: "center" }}>
                        <Grid className="col-3">
                            <LinearProgress color="success" />
                        </Grid>
                        <Grid className="col-6">
                            <h2 className='text-center border-warning text-danger'>
                                Sản phẩm liên quan
                            </h2></Grid>
                        <Grid className="col-3"><LinearProgress color="success" /> </Grid>

                    </Grid>
                        <Grid >
                            <Grid container>
                                {clockList.map((clock, index) => {
                                    return (
                                        <OrderDetail key={index} nameProp={clock.name} priceProp={clock.promotionPrice} img={clock.imageUrl} buyProp={clock.buyPrice} id={clock._id} />
                                    )
                                })}
                            </Grid>
                        </Grid >
                    </Grid>
                </Col>
            </Row>
            <Grid container justifyContent="end">
                <Grid item>
                    <Pagination color="secondary"
                        count={noPage} defaultPage={page} onChange={changePageHandler}>
                    </Pagination>
                </Grid>
            </Grid>
            <Snackbar open={openAlert} autoHideDuration={6000} onClose={handleCloseAlert}>
                <Alert onClose={handleCloseAlert} sx={{ width: '100%' }}>
                    {noidungAlertValid}
                </Alert>
            </Snackbar>
            <Grid>
                < ModalOrderChitie
                    openModalAdd={openModalAdd}
                    handleClose={handleClose}
                    product={product}
                    quantity={quantity}
                />
            </Grid>
        </Container>
    )
}
export default ProductDitail