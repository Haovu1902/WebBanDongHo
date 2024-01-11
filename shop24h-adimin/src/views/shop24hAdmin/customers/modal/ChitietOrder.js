import { Alert, Button, Snackbar, Typography, Grid, Pagination } from "@mui/material"
import { CModal, CModalHeader, CModalBody, CModalFooter } from '@coreui/react';
import React, { useEffect, useState } from 'react'
import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CRow,
    CTable,
    CTableBody,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
} from '@coreui/react'

function ModalOrderCustumer({ openModalOrder, handleCloseOrder, idCustumer }) {
    const [order, setOrder] = useState([])
    //Limit: số lượng bản ghi trên 1 trang
    const [limit, setLimit] = useState(10);
    //số trang: tổng số lượng sản phẩm / limit - Số lớn hơn gần nhất
    const [noPage, setNoPage] = useState(0);
    //Trang hiện tại
    const [page, setPage] = useState(1);
    const onChangePagination = (event, value) => {
        setPage(value);
      }
      const handleChangeLimit = (event) => {
        setLimit(event.target.value);
      };
    const fetchAPI = async (url, body) => {
        const response = await fetch(url, body)
        const data = await response.json()
        return data
    }
    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    }

    useEffect(() => {

        fetchAPI(`http://localhost:8000/customer/${idCustumer}/orders`)
            .then((data) => {
                console.log(data)
                setNoPage(Math.ceil(data.data.length / limit));
                setOrder(data.data.slice((page - 1) * limit, page * limit))

            })
            .catch((error) => {
                console.error(error.message)
            });
    }, [idCustumer,limit, page])

    const onBtnCancelClick = () => {
        handleCloseOrder()
    }
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 500,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        fontWeight: "bold",
    };

    return (
        <>
            <CModal
                visible={openModalOrder}
                onClose={handleCloseOrder}
                backdrop="static" size='lg'
            >
                <CModalHeader>
                    <Grid container align="center">
                        <Grid item xs={12}>
                            <Typography id="modal-modal-title" variant="h4" align="center" style={{ color: "#00695c" }}>
                                <strong>Danh sách đơn hàng</strong>
                            </Typography>
                        </Grid>
                    </Grid>
                </CModalHeader>
                <CModalBody>
                    <CTable striped hover>
                        <CTableHead color="dark">
                            <CTableRow>
                                <CTableHeaderCell scope="col">STT</CTableHeaderCell>
                                <CTableHeaderCell scope="col">Đơn hàng</CTableHeaderCell>
                                <CTableHeaderCell scope="col">Ngày Đặt hàng</CTableHeaderCell>
                                <CTableHeaderCell scope="col">Tổng tiền</CTableHeaderCell>
                                <CTableHeaderCell scope="col">Chi tiết</CTableHeaderCell>
                            </CTableRow>
                        </CTableHead>
                        <CTableBody>
                            {order.map((order, index) => {
                                return (
                                    <CTableRow key={index}>
                                        <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                                        <CTableDataCell>
                                            {order.orderDetail.map((product, index2) => (
                                                <tr key={index2}>
                                                    {product.product.name} : {product.quantity}
                                                </tr>
                                            ))}
                                        </CTableDataCell>
                                        <CTableDataCell>
                                            {order.shipperDate}
                                        </CTableDataCell>
                                        <CTableDataCell>
                                            {numberWithCommas(order.cost)} USD
                                        </CTableDataCell>
                                        <CTableDataCell>
                                            {(order.note)}
                                        </CTableDataCell>
                                    </CTableRow>
                                )
                            })}
                        </CTableBody>
                    </CTable>
                    <Grid container mt={3} mb={2} justifyContent="flex-end">
              <Grid item >
                <Pagination count={noPage} color="primary" defaultPage={1} onChange={onChangePagination} />
              </Grid>
            </Grid>

                </CModalBody>
                <CModalFooter>
                    <Grid container className="mt-4 text-center">
                        <Grid item sm="12">
                            <Grid container className="mt-4">
                                <Grid item sm="12">
                                    <Button onClick={onBtnCancelClick} className="bg-danger text-white">Đóng</Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </CModalFooter>

            </CModal>
        </>
    )
}

export default ModalOrderCustumer
