import {
    Grid,
    Alert,
    Box,
    Button,
    TextField,
    FormControl,
    InputLabel,
    Modal,
    Select,
    Snackbar,
    Typography,
    MenuItem,
} from "@mui/material";
import {
    CButton, CCol, CFormInput, CFormSelect, CFormTextarea, CModal, CModalBody,
    CModalFooter, CModalHeader, CModalTitle, CRow, CToast, CToastBody, CToastClose, CToaster,
} from '@coreui/react';
import CIcon from '@coreui/icons-react'
import { useEffect, useState } from 'react';
import { cilDelete } from '@coreui/icons'
import React from 'react';
function ModalEdit({ orderDetailEdit, name1, openModalEdit, handleCloseEdit, idEdit, shippedDateEdit, style, fetchAPI, setVarRefeshPage, varRefeshPage, rowClicked }) {
    const [shipperDate, setShippedDate] = useState("");
    const [note, setNote] = useState("");

    const [quantity, setQuantity] = useState(1);
    const [cost, setCost] = useState(0);

    //Alert
    const [openAlert, setOpenAlert] = useState(false)
    const [statusModal, setStatusModal] = useState("error");
    const [noidungAlertValid, setNoidungAlertValid] = useState("");
    //Select Type
    const [products, setProducts] = useState([])

    useEffect(() => {
        fetchAPI('http://localhost:8000/product')
            .then((data) => {
                setProducts(data.data)
                console.log(data.data)
            })
            .catch((error) => {
                console.error(error.message)
            })

    }, [])

    const onBtnUpdateClick = () => {
        console.log("Update được click!")
        var vCheckData = valiDate()
        if (vCheckData) {
            const body = {
                method: 'PUT',
                body: JSON.stringify({
                    shipperDate: shipperDate,
                    orderDetail: orderDetailEdit,
                    note: note,
                    cost: cost
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            }
            fetchAPI('http://localhost:8000/orders/' + idEdit, body)
                .then((data) => {
                    console.log(data);
                    setOpenAlert(true);
                    setNoidungAlertValid("Update User thành công!")
                    setStatusModal("success")
                    setVarRefeshPage(varRefeshPage + 1)
                    handleCloseEdit()
                })
                .catch((error) => {
                    console.log(error);
                    setOpenAlert(true);
                    setNoidungAlertValid("Update User thất bại!")
                    setStatusModal("error")
                    handleCloseEdit()
                })
        }
    }

    const valiDate = () => {
        if (shipperDate === "") {
            setOpenAlert(true);
            setStatusModal("error")
            setNoidungAlertValid("Chưa có ngày nhận hàng")
            return false
        }
        return true;
    }

    //Đóng Alert
    const handelCloseAlert = () => {
        setOpenAlert(false);
    }
    //Đóng Modal
    const onBtnCancelClick = () => {
        handleCloseEdit()
    }


    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    }

    useEffect(() => {
        setNote(rowClicked.note);
        setCost(rowClicked.cost)
    }, [orderDetailEdit])
    return (
        <>
            <Modal
                open={openModalEdit}
                onClose={handleCloseEdit}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h4" align="center" style={{ color: "#00695c" }}>
                        <strong>Sửa danh sách khách hàng</strong>
                    </Typography>

                    <Grid container style={{ marginTop: "30px" }}>
                        <Grid item xs={6} p={2}>
                            {/* ID */}
                            <Grid container mt={2}>
                                <Grid item sm={12}>
                                    <Grid container>
                                        <Grid item sm={6}>
                                            <Typography variant="h6"><b>Tên khách hàng</b></Typography>
                                        </Grid>
                                        <Grid item sm={6}>
                                            <Typography variant="h6" color="red"><b>{name1}</b></Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                            {/* Shipped Date */}
                            <Grid container mt={3}>
                                <Grid item sm={12}>
                                    <Grid container>
                                        <Grid item sm={3}>
                                            <label>Shipped Date:</label>
                                        </Grid>
                                        <Grid item sm={9}>
                                            <CFormInput fullWidth className="bg-white" type="date"
                                                size="small" value={shipperDate} onChange={(event) => setShippedDate(event.target.value)} />
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                            {/* Note */}
                            <Grid container mt={2}>
                                <Grid item sm={12}>
                                    <Grid container>
                                        <Grid item sm={3}>
                                            <label>Note:</label>
                                        </Grid>
                                        <Grid item sm={9}>
                                            <CFormInput fullWidth value={note} className="bg-white"
                                                size="small" onChange={(event) => setNote(event.target.value)} />
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                            {/* Tổng tiền */}
                            <Grid container mt={2}>
                                <Grid item sm={12}>
                                    <Grid container>
                                        <Grid item xs={3}>
                                            <label>Tổng tiền:</label>
                                        </Grid>
                                        <Grid item xs={9} color="red">
                                            {(rowClicked.cost)} USD
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid item xs={6} p={2} >
                            <Grid container mt={2}>
                                <Grid item sm={12}>
                                    <Grid textAlign = "center" color="red"><h4>Danh sách sản phẩm</h4></Grid>
                                    <Grid container mt={2}>
                                        {orderDetailEdit.map((product, index2) => (
                                            <ul key = {index2}>
                                                <li>
                                                 tên sản phẩm:{product.product.name} : số lượng {product.quantity} <br/>
                                                </li>
                                            </ul>

                                        ))}
                                    </Grid>
                                </Grid>
                            </Grid>

                        </Grid>
                    </Grid>

                    <Grid container className="mt-4 text-center">
                        <Grid item sm={12}>
                            <Grid container className="mt-4">
                                <Grid item sm={6}>
                                    <Button onClick={onBtnUpdateClick} className="bg-success w-75 text-white">Edit Order</Button>
                                </Grid>
                                <Grid item sm={6}>
                                    <Button onClick={onBtnCancelClick} className="bg-secondary w-75 text-white">Hủy Bỏ</Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
            </Modal >
            <Snackbar open={openAlert} autoHideDuration={6000} onClose={handelCloseAlert}>
                <Alert onClose={handelCloseAlert} severity={statusModal} sx={{ width: '100%' }}>
                    {noidungAlertValid}
                </Alert>
            </Snackbar>
        </>
    )
}

export default ModalEdit;