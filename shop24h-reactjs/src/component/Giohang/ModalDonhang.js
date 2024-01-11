import { Alert, Box, Button, Input, Modal, Snackbar, Typography } from "@mui/material"
import { Col, Row } from "reactstrap"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { Mail } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

// khach hang đặt hàng 

function ModalDonHang({ openModalAdd, handleClose }) {
    const navigate = useNavigate();
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 600,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };
    const { fullName, email } = useSelector((reduxData) => reduxData.taskDonHangReducer);
    const node1 = useSelector((reduxData) => reduxData.taskCheckBook);
    console.log("123", node1)
    const [phone, setSoDT] = useState("")
    const [chitiet, setChiTiet] = useState("")
    const [diaChi, setDiaChi] = useState("")
    const [huyeTinh, setHuyenTinh] = useState("")
    const onChangeSDTHander = (event) => { setSoDT(event.target.value) }
    const onClickChiTiet = (event) => { setChiTiet(event.target.value) }
    const onChangeDiaChiHander = (event) => { setDiaChi(event.target.value) }
    const onChangeHuyenTinhHander = (event) => { setHuyenTinh(event.target.value) }
    const dispatch = useDispatch();
    const onChangeFullNameHander = (event) => {
        dispatch({
            type: "FULL_NAME_ON_CHANGE",
            payload: {
                fullName: event.target.value
            }
        })

    }
    const onChangeEmailHander = (event) => {
        dispatch({
            type: "EMAIL_ON_CHANGE",
            payload: {
                email: event.target.value
            }
        })
    }
    const getData = async (paramUrl, paramOptions = {}) => {
        const response = await fetch(paramUrl, paramOptions);
        const responseData = await response.json();
        return responseData;

    }
    const createOrder = (customer) => {
        const CustomerId = customer._id;
        let body = {
            method: "POST",
            body: JSON.stringify({
                orderDetail: node1,
                cost: tongtien(node1),
                note: chitiet,
                customerInfo: customer
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        }
        getData(`http://localhost:8000/orders/${CustomerId}/orders`, body)
            .then((data) => {
                console.log(data.data)
                setOpenAlert(true);
                setStatusModal("success")
                setNoidungAlertValid("xác nhận đơn hàng thành công!")
            })
    }
    // Tạo mới khách hàng
    const createNewCustomer = () => {
        console.log("thêm đơn được click!")
        var vDataForm = {
            fullName: fullName,
            phone: phone,
            email: email,
            address: diaChi,
            city: huyeTinh,
            country: "việt nam"
        }
        var vCheckData = validateDataForm(vDataForm);
        if (vCheckData) {
            console.log(vDataForm)
            const body = {
                method: 'POST',
                body: JSON.stringify({
                    fullName: vDataForm.fullName,
                    phone: vDataForm.phone,
                    email: vDataForm.email,
                    address: vDataForm.address,
                    city: vDataForm.city,
                    country: vDataForm.country
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                }
            }
            getData("http://localhost:8000/customer", body)
                .then((data) => {
                })
                .catch((error) => {
                    setOpenAlert(true);
                    console.log(error);
                })
        }
    }

    const createNewOrderOfCustomer = () => {
        getData("http://localhost:8000/customer?phoneNumber=" + phone)
            .then((data) => {
                if (data.data.length === 0) {
                    createNewCustomer();
                    handleClose()

                } else {
                    createOrder(data.data[0]);
                    handleClose()

                }

            })
            .catch((error) => {
                console.log(error);
            })
    }
    const onClickXacnhan = () => {
        var vDataForm = {
            fullName: fullName,
            phone: phone,
            email: email,
            address: diaChi,
            city: huyeTinh,
            country: "việt nam"
        }
        var vCheckData = validateDataForm(vDataForm);
        if (vCheckData) {
            createNewOrderOfCustomer()
            // setTimeout(navigate('/'), 4000);
            window.location.reload ()
        }
        dispatch({
            type: "XAC_NHAN_DON_HANG",
        })

    }
    useEffect(() => {

    }, [fullName, email, phone])
 
    const emailValidate = (paramEmail) => {
        return !!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(paramEmail);
    }
    const [noidungAlertValid, setNoidungAlertValid] = useState("")
    const [stutusModal, setStatusModal] = useState("error")
    const [openAlert, setOpenAlert] = useState(false)
    const handleCloseAlert = () => {
        setOpenAlert(false)
    }

    const validateDataForm = (paramDataForm) => {
        if (paramDataForm.fullName === "") {
            setOpenAlert(true);
            setStatusModal("error")
            setNoidungAlertValid("fullname phải được điền vào!");

            return false;
        }
        if (paramDataForm.phone === "") {
            setOpenAlert(true);
            setStatusModal("error")
            setNoidungAlertValid("số điện thoại phải được điền vào!");
            return false;
        }
        if (!emailValidate(email)) {
            setOpenAlert(true);
            setStatusModal("error")
            setNoidungAlertValid("email Sai định dạng!");
            return false;
        }
        if (paramDataForm.address === "") {
            setOpenAlert(true);
            setStatusModal("error")
            setNoidungAlertValid(" bạn chưa nhập đia chỉ !");
            return false;
        }

        else {
            return true;
        }
    }
    const onClickclosemodal = () => {
        handleClose()
    }
    const tongtien = (param) => {
        var tong = 0
        for (var i = 0; i < param.length; i++) {
            tong = tong + (param[i].quantity * param[i].product.promotionPrice)
        }
        return tong
    }
    return (
        <>
            <Modal
                open={openModalAdd}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography mb={2} id="modal-modal-title" variant="h5" component="h2">
                        <strong>Đơn hàng!</strong>
                    </Typography>
                    <Row>
                        <Col sm="12">
                            <Row>
                                <Col sm="3">
                                    <label>Họ và Tên:</label>
                                </Col>
                                <Col sm="9">
                                    <Input fullWidth value={fullName} onChange={onChangeFullNameHander} />
                                </Col>
                            </Row>
                        </Col>
                    </Row>

                    <Row className="mt-2">
                        <Col sm="12">
                            <Row>
                                <Col sm="3">
                                    <label>Số điện Thoại:</label>
                                </Col>
                                <Col sm="9">
                                    <Input fullWidth onChange={onChangeSDTHander} />
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row className="mt-3">
                        <Col sm="12">
                            <Row>
                                <Col sm="3">
                                    <label>Email:</label>
                                </Col>
                                <Col sm="9">
                                    <Input fullWidth value={email} onChange={onChangeEmailHander} />
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row className="mt-3">
                        <Col sm="12">
                            <Row>
                                <Col sm="3">
                                    <label>Địa chỉ (số nhà, tên Đường, xã):</label>
                                </Col>
                                <Col sm="9" >
                                    <Input fullWidth onChange={onChangeDiaChiHander} />
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row className="mt-3">
                        <Col sm="12">
                            <Row>
                                <Col sm="3">
                                    <label>Huyện, Tỉnh(ghi rõ địa chỉ):</label>
                                </Col>
                                <Col sm="9" >
                                    <Input fullWidth onChange={onChangeHuyenTinhHander} />
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row className="mt-3">
                        <Col sm="12">
                            <Row>
                                <Col sm="3">
                                    <label>Chi tiết Đơn hàng:</label>
                                </Col>
                                <Col sm="9" >
                                    <Input fullWidth onChange={onClickChiTiet} />
                                </Col>
                            </Row>
                        </Col>
                    </Row>

                    <Row className="mt-4 text-center">
                        <Col sm="12">
                            <Row className="mt-4">
                                <Col sm="6" style={{ color: "red" }}>
                                    <Button className="bg-success w-75 text-white" onClick={onClickXacnhan}>Xác nhận</Button>
                                </Col>
                                <Col sm="6">
                                    <Button className="bg-success w-75 text-white" onClick={onClickclosemodal} >Trở về</Button>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Box>
            </Modal>
            <Snackbar open={openAlert} autoHideDuration={6000} onClose={handleCloseAlert}>
                <Alert onClose={handleCloseAlert} severity={stutusModal} sx={{ width: '100%' }}>
                    {noidungAlertValid}
                </Alert>
            </Snackbar>
        </>
    )
}
export default ModalDonHang