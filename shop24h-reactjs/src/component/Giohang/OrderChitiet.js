import { Alert, Box, Button, Input, Modal, Snackbar, Typography } from "@mui/material"
import { Col, Row } from "reactstrap"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { Mail } from "@mui/icons-material";

function ModalOrderChitie({ openModalAdd, handleClose, product , quantity }) {
   
    console.log(1234)
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
    console.log(fullName)
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
    //Tạo mới khách hàng
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
        //them
        var vCheckData = validateDataForm(vDataForm);
        if (vCheckData) {
            console.log(vCheckData)
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
                    setOpenAlert(true);
                    setStatusModal("success")
                    setNoidungAlertValid("xác nhận đơn hàng thành công!")
                    console.log(data);
                    //setUsers(data);
                })
                .catch((error) => {
                    setOpenAlert(true);
                    setStatusModal("error")
                    setNoidungAlertValid("đơn hàng thất bại!")
                    console.log(error);
                })
        }
    }
    // sua
    const createOrder = (CustomerId) => {

        let body = {
            method: "POST",
            body: JSON.stringify({
                orderDetail: product,
                cost: quantity*product.promotionPrice,
                note: chitiet
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        }
        getData(`http://localhost:8000/orders/${CustomerId}/orders`, body)
            .then((data) => {
                
            })
}
    const createNewOrderOfCustomer = () => {
        getData("http://localhost:8000/customer?phoneNumber=" + phone)
        .then((data) => {
            if (data.data.length === 0) {
                createNewCustomer();
                setOpenAlert(true);
                    setStatusModal("success")
                    setNoidungAlertValid("xác nhận đơn hàng thành công!")
                    console.log(data);
                
            } else {
                createOrder(data.data[0]._id);
                setOpenAlert(true);
                    setStatusModal("success")
                    setNoidungAlertValid("xác nhận đơn hàng thành công!")
                    console.log(data);
            }

        })
        .catch((error) => {
            console.log(error);
            setOpenAlert(true);
            setStatusModal("error")
            setNoidungAlertValid("đơn hàng thất bại!")
            
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
        console.log(vDataForm)
        if (vCheckData){
            createNewOrderOfCustomer()
            handleClose()
        }
        
       

}
    

    useEffect(() => {
        
    }, [fullName, email])

    




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
   
    useEffect(() => {
    
    }, [fullName, email])
    // function priceFormat(x) {
    //     return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    // }

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
export default ModalOrderChitie