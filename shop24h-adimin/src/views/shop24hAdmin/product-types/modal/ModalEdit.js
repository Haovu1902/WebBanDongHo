import {
    Grid,
    Alert,
    Box,
    Button,
    Modal,
    Snackbar,
    Typography,
} from "@mui/material";

import { CFormInput } from '@coreui/react';

import { useState, useEffect } from 'react';

function ModalEdit({ openModalEdit, handleCloseEdit, idEdit, style, fetchAPI, setVarRefeshPage, varRefeshPage, rowClicked }) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    //Alert
    const [openAlert, setOpenAlert] = useState(false)
    const [statusModal, setStatusModal] = useState("error");
    const [noidungAlertValid, setNoidungAlertValid] = useState("");


    const onBtnUpdateClick = () => {
        console.log("Update được click!")
        var vCheckData = valiDate()
        if (vCheckData) {
            const body = {
                method: 'PUT',
                body: JSON.stringify({
                    name: name,
                    description: description,
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            }

            fetchAPI('http://localhost:8000/producttype/' + idEdit, body)
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
        if (name === "") {
            setOpenAlert(true);
            setNoidungAlertValid("Name chưa được điền!")
            setStatusModal("error")
            return false
        }
        if (description === "") {
            setOpenAlert(true);
            setNoidungAlertValid("Description chưa được điền!")
            setStatusModal("error")
            return false
        }
        return true
    }

    //Đóng Alert
    const handelCloseAlert = () => {
        setOpenAlert(false);
    }
    //Đóng Modal
    const onBtnCancelClick = () => {
        handleCloseEdit()
    }

    useEffect(() => {
        setName(rowClicked.name)
        setDescription(rowClicked.description)
    }, [openModalEdit])

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
                        <strong>Sửa Loại Sản Phẩm</strong>
                    </Typography>

                    <Grid container style={{ marginTop: "30px" }}>
                        <Grid container mt={2}>
                            <Grid item sm={12}>
                                <Grid container>
                                    <Grid item sm={3}>
                                        <Typography variant="h6"><b>ID</b></Typography>
                                    </Grid>
                                    <Grid item sm={9}>
                                        <Typography variant="h6" sx={{ color: "red" }}><b>{idEdit}</b></Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid container mt={3}>
                            <Grid item sm={12}>
                                <Grid container>
                                    <Grid item sm={3}>
                                        <label>Name:</label>
                                    </Grid>
                                    <Grid item sm={9}>
                                        <CFormInput fullWidth className="bg-white"
                                            size="small" value={name} onChange={(event) => setName(event.target.value)} />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid container mt={2}>
                            <Grid item sm={12}>
                                <Grid container>
                                    <Grid item sm={3}>
                                        <label>Description:</label>
                                    </Grid>
                                    <Grid item sm={9}>
                                        <CFormInput fullWidth value={description} className="bg-white"
                                            size="small" onChange={(event) => setDescription(event.target.value)} />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid container className="mt-4 text-center">
                        <Grid item sm={12}>
                            <Grid container className="mt-4">
                                <Grid item sm={6}>
                                    <Button onClick={onBtnUpdateClick} className="bg-success w-75 text-white">Edit Type</Button>
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