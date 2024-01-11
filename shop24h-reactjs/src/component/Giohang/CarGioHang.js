import { Card, Grid, Checkbox, Typography, IconButton, Button, CardMedia } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { useState, useEffect } from "react";
import { Col, Row } from "reactstrap";
import { CheckBox } from "@mui/icons-material";
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddCircleIcon from '@mui/icons-material/AddCircle';

//sử dụng các tính năng như them sp, xóa sp,..

function CarGioHang({ image, name, buyPrice, promotionPrice, setTongTien, product, onDispathCard, checked1 }) {
    const node = useSelector((reduxData) => reduxData.taskCheckBook);
    const check = useSelector((reduxData) => reduxData.taskCheckAll);
    const [soluong, setSoLuong] = useState(product.quantity)


    const onThemClick1 = () => {

        dispatch({
            type: "THEM_SO_LUONG",
            value:
            {
                product: product.product, // du lieu ve san pham
                quantity: product.quantity // so luong sp
            }
        })

    }
    const onTruClick1 = () => {
        if (soluong > 1) {
            dispatch({
                type: "GIAM_SO_LUONG",
                value:
                {
                    product: product.product,
                    quantity: product.quantity
                }
            })
        }
        else {
            setSoLuong(1)
        }

    }
    const onDeleteClick = (product) => {
        onDispathCard(product)
        console.log(product)


    }
    const dispatch = useDispatch();
    const onClickCheckbox = (event, product) => {
        if (event.target.checked) {

            dispatch({
                type: "CHON_SAN_PHAM",
                value:
                {
                    product: product.product,
                    quantity: product.quantity
                }
            })
            console.log(product)
            setTongTien(tongtien(node))
        }
        else {
            dispatch({
                type: "BO_SAN_PHAM",
                value:
                {
                    product: product.product,
                    quantity: product.quantity
                }
            })
        }
        setTongTien(tongtien(node))
    }
    const tongtien = (param) => {
        var tong = 0
        for (var i = 0; i < param.length; i++) {
            tong = tong + (param[i].quantity * param[i].product.promotionPrice)
        }
        return tong
    }
    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
      }

    return (
        <Col className=" col-sm-12">
            <Grid container p={3} mt={1} sx={{ display: "flex", alignItems: "center" }}>
                <Col item className=" col-sm-1 p-2">
                    {/* < Checkbox 
                     onChange={(event) => onClickCheckbox(event, product)} /> */}
                    {checked1 == true  ?  <></>
                     : < Checkbox
                    onChange={(event) => onClickCheckbox(event, product)} />}

                </Col>
                <Col className=" col-sm-2 p-2" sx={{ display: "flex", justifyContent: "center" }}>
                    <CardMedia
                        component="img"
                        height="50px"
                        image={image}
                        sx={{ width: "70px" }}
                        alt="green iguana"
                    />
                </Col>
                <Col className=" col-sm-2" sx={{ color: "#1e0fd0" }} textAlign="center">
                    <Grid variant="h6">
                        {name}
                    </Grid>
                </Col>
                <Col className={" col-sm-1"} sx={{ display: "flex", justifyContent: "center" }}>
                    <strike style={{ color: "red" }}> {numberWithCommas(buyPrice)}VND</strike> &nbsp; {numberWithCommas(promotionPrice)}VND
                </Col>
                <Col className={"col-sm-3"} style={{ display: "flex", alignItems: "center", justifyContent: "center" }} >
                    <IconButton size="large" onClick={onTruClick1}>
                        < RemoveCircleOutlineIcon style={{ borderRadius: "50%", backgroundColor: "red", color: "beige" }} />
                    </IconButton>
                    <Typography variant="h6" styl={{ display: "flex", justifyContent: "center" }} >&nbsp;  {product.quantity} &nbsp;  </Typography>
                    <IconButton size="large" onClick={onThemClick1} >
                        <AddCircleIcon style={{ borderRadius: "50%", backgroundColor: "blue", color: "beige" }} />
                    </IconButton>
                </Col>

                <Col className={"col-sm-2"} sx={{ display: "flex", justifyContent: "center" }}>
                    <>{numberWithCommas(Number(promotionPrice * product.quantity))} VND</>
                </Col>
                <Col className={"col-sm-1"} sx={{ display: "flex", justifyContent: "flex-end", height: "35px" }}>
                    <Button sx={{ backgroundColor: "red", color: "black" }} onClick={() => onDeleteClick(product)} >Xóa</Button>
                </Col>
            </Grid>
        </Col>
    )
}
export default CarGioHang