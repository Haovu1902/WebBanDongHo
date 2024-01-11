import { Alert, Button, Snackbar, Typography, Grid, Pagination, Box } from "@mui/material"
import { CModal, CModalHeader, CModalBody, CModalFooter } from '@coreui/react';
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
import { useState } from "react";
function ModalDiachi({ chitiet, sanpham, tongtien, diachi, openModalDiachi, handleCloseDiachi }) {


    const onBtnCancelClick = () => {
        handleCloseDiachi()
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
    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    }
    return (
        <>
            
                <CModal
                    visible={openModalDiachi}
                    onClose={handleCloseDiachi}
                    backdrop="static" 
                    sx={style}
                >
                    <CModalHeader marinT>
                        <Grid container align="center">
                            <Grid item xs={12}>
                                <Typography id="modal-modal-title" variant="h4" align="center" style={{ color: "#00695c" }}>
                                    <strong>Chi Tiết đơn hàng</strong>
                                </Typography>
                            </Grid>
                        </Grid>
                    </CModalHeader>
                    <CModalBody >
                        <CTable striped hover >
                            <CTableHead color="dark">
                                <CTableRow>
                                    <CTableHeaderCell scope="col">Tên Sản phẩm</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Số lượng</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Chi tiết</CTableHeaderCell>
                                </CTableRow>
                            </CTableHead>
                            <CTableBody >
                                <CTableDataCell>
                                    {sanpham.map((product, index2) => (
                                        <tr key={index2}>
                                            {product.product.name}
                                        </tr>
                                    ))}
                                </CTableDataCell>
                                <CTableDataCell>
                                    {sanpham.map((product, index2) => (
                                        <tr key={index2}>
                                            {product.quantity}
                                        </tr>
                                    ))}
                                </CTableDataCell>
                                <CTableDataCell> {chitiet} </CTableDataCell>
                            </CTableBody>
                        </CTable>
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

export default ModalDiachi
