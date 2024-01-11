import { Card, Grid, IconButton, InputBase, Divider, Paper, CardMedia, Checkbox, Button, TableCell, TableBody, ButtonGroup, Typography, TableContainer, Table, TableHead, TableRow } from "@mui/material"
import DirectionsIcon from '@mui/icons-material/Directions';
import React, { useEffect, useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import { useSelector, useDispatch } from 'react-redux/es/exports';
import MenuIcon from '@mui/icons-material/Menu';
import CarGioHang from "./Giohang/CarGioHang";
import ModalDonHang from "./Giohang/ModalDonhang";
import { useAccordionButton } from "react-bootstrap";
import { Col, Row } from "reactstrap";
import { useNavigate } from "react-router-dom";


function GioHang() {
      const navigate = useNavigate();
    const [checked1, setChecked] = useState(false);
    const product = useSelector((reduxData) => reduxData.taskCardReducer);
    const node = useSelector((reduxData) => reduxData.taskCheckBook)
    const check = useSelector((reduxData) => reduxData.taskCheckAll);

    const [productList, setProductList] = useState(product)
    const [cost, setCost] = useState(0);

    const dispatch = useDispatch();
    const [Tongtien, setTongTien] = useState(0)

    const onDispathCard = (product) => {
        dispatch({
            type: "DELETE_PRODUCT_IN_CARD",
            value:
            {
                product: product

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

  
    //Lấy user
    //tinh tong tien
    const tongtien = (param) => {
        var tong = 0
        for (var i = 0; i < param.length; i++) {
            tong = tong + (param[i].quantity * param[i].product.promotionPrice)
        }
        return tong
    }
    useEffect(() => {

    }, [product, node, check])

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
      }
    return (
        <div className="container" style={{ marginTop: "100px" }}  >
            <Col className=" col-sm-12">
                <Grid container p={3} mt={1} sx={{ backgroundColor: "rgb(237 200 219)" }}>
                <Col className=" col-sm-1">Chọn</Col>
                <Col className=" col-sm-2">Sản phẩm</Col>
                <Col className=" col-sm-2">Tên sản phẩm</Col>
                <Col className=" col-sm-2">Giá sản phẩm</Col>
                <Col className=" col-sm-2">Số lượng</Col>
                <Col className=" col-sm-2">Thành tiền</Col>
                <Col className=" col-sm-1">Action</Col>
                </Grid>
            </Col>
            <Col >
                {productList.map((product, index) => {
                    return (
                        <CarGioHang md={3} sm={6} key={index}
                            name={product.product.name}
                            promotionPrice={product.product.promotionPrice}
                            image={product.product.imageUrl}
                            buyPrice={product.product.buyPrice}
                            type={product.product.type}
                            product={product}
                            onDispathCard={onDispathCard}
                            setTongTien={setTongTien}
                            checked1 ={checked1}
                        />
                    )
                })}

                <Row className="container"  >
                    <Col className=" col-sm-3" sx={{ display: "grid", justifyContent: "center" }} variant="h2"><h4>Tìm mã Voucher: </h4></Col>
                    <Col className=" col-sm-9" sx={{ display: "grid", justifyContent: "center" }}>
                        <Paper
                            component="form"
                            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400, height: "40px" }}
                        >
                            <InputBase
                                sx={{ ml: 1, flex: 1 }}
                                placeholder="Nhập mã Voucher nếu có"
                                inputProps={{ 'aria-label': 'search google maps' }}
                            />
                            <IconButton type="submit" sx={{ p: '10px' }}>
                                <SearchIcon />
                            </IconButton>

                        </Paper>
                    </Col>

                </Row>
                <Row className="container" style={{marginTop: "40px"}}>
                   
                    <Col className={"col-sm-9"}>
                        <Grid container sx={{ justifyContent: "space-around" }}>
                            <Col className={"col-sm-8"} >
                                <h4>Tổng thanh toán: {numberWithCommas(Number(Tongtien))}VNĐ</h4>
                            </Col>
                            <Col className={"col-sm-4"} >
                                <Button variant="contained" onClick={onClickMuahang}>Mua hàng</Button>
                            </Col>
                        </Grid>
                    </Col>

                </Row>
            </Col>
            < ModalDonHang openModalAdd={openModalAdd} handleClose={handleClose} />
           
        </div>
    )
}
export default GioHang