import { Alert, Button, Snackbar, Typography, Grid } from "@mui/material"
import { CModal, CModalHeader, CModalBody, CModalFooter } from '@coreui/react';

import { useState } from "react";

function ModalDiachiCustumer({ openModalDiachi, handleCloseDiachi, Diachi, emailCustumer}) {
  

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
   
    return (
        <>
            <CModal
                visible={openModalDiachi}
                onClose={handleCloseDiachi}
                backdrop="static" size='lg'
            >
                <CModalHeader>
                    <Grid container align="center">
                        <Grid item xs={12}>
                            <Typography id="modal-modal-title" variant="h4" align="center" style={{ color: "#00695c" }}>
                                <strong>Địa chỉ</strong>
                            </Typography>
                        </Grid>
                    </Grid>
                </CModalHeader>
                <CModalBody>
                    <Grid container className="mt-2">
                        <Grid item xs={12} align="center">
                            <Typography mb={2} variant="h5">
                                Địa chỉ Khách hàng: 
                                <Typography mb={2} variant="h5" style={{ color: "red", marginTop: "20px" }}>
                                  Email:   { emailCustumer }
                                </Typography>
                                <Typography mb={2} variant="h5" style={{ color: "red", marginTop: "20px" }}>
                                   Nơi ở: {Diachi}
                                </Typography>
                            </Typography>
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

export default ModalDiachiCustumer
