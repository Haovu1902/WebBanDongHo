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
} from '@coreui/react';

import { Grid, TextField, Pagination, InputLabel, Select, MenuItem, Button, ButtonGroup } from '@mui/material'

import ModalAddNew from "./modal/ModalAddNew"
import ModalEdit from "./modal/ModalEdit"
import ModalDelete from "./modal/ModalDelete"
import ModalOrderCustumer from "./modal/ChitietOrder"
import ModalDiachiCustumer from "./modal/ChitietDiachi"

//Style
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
  fontWeight: "bold",
};


const Customers = () => {
  const [customers, setCustomers] = useState([])
  const [customerPhone, setCustomerPhone] = useState("")
  const [orders, setOrders] = useState([]);

  //PANIGATION
  //Limit: số lượng bản ghi trên 1 trang
  const [limit, setLimit] = useState(10);
  //số trang: tổng số lượng sản phẩm / limit - Số lớn hơn gần nhất
  const [noPage, setNoPage] = useState(0);
  //Trang hiện tại
  const [page, setPage] = useState(1);
  //Load trang
  const [varRefeshPage, setVarRefeshPage] = useState(0);

  //PANIGATION
  const handleChangeLimit = (event) => {
    setLimit(event.target.value);
  };
  const onChangePagination = (event, value) => {
    setPage(value);
  }

  //MODAL
  const [openModalAdd, setOpenModalAdd] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);

  //Đóng Modal
  const handleClose = () => setOpenModalAdd(false);
  const handleCloseEdit = () => setOpenModalEdit(false);
  const handleCloseDelete = () => setOpenModalDelete(false);

  //Modal Add New
  const onBtnAddOrderClick = () => {
    console.log("Nút thêm được click")
    setOpenModalAdd(true)
  }

  //Modal Edit
  const [rowClicked, setRowClicked] = useState([]);
  const [idEdit, setIdEdit] = useState("");

  const onBtnEditClick = (row) => {
    console.log("Nút sửa được click")
    console.log("ID: " + row._id)
    setOpenModalEdit(true)
    setRowClicked(row)
    setIdEdit(row._id)
  }
  //Modal địa chỉ
  const [openModalDiachi, setOpenModalDiachi] = useState(false);
  const [Diachi, setDiachi] = useState("")
  const [emailCustumer, setEmailCustumer] = useState()
  const onBtnChiTietClick = (row) => {
    setOpenModalDiachi(true)
    setEmailCustumer(row.email)
    console.log(row)
    setDiachi(row.address + ", " + row.city + ", " + row.country)
  }
  const handleCloseDiachi = () => setOpenModalDiachi(false);
  //Modal chi tiết order
  const [openModalOrder, setOpenModalOrder] = useState(false);
  const [order, setOrder] = useState([])
  const [idCustumer, setIdCustumer] = useState([])
  const onBtnChiTietOrderClick = (row) => {
    setOpenModalOrder(true)
    setOrder(row.orders)
    setIdCustumer(row._id)
    console.log(row)

  }
  const handleCloseOrder = () => setOpenModalOrder(false);

  //Modal Delete
  //ID
  const [idDelete, setIdDelete] = useState("");
  const [nameDelete, setNameDelete] = useState("");

  const onBtnDeleteClick = (row) => {
    console.log("Nút xóa được click")
    console.log("ID: " + row._id)
    setOpenModalDelete(true)
    setIdDelete(row._id)
    setNameDelete(row.fullName)
  }


  //LOAD  API
  const fetchAPI = async (url, body) => {
    const response = await fetch(url, body)
    const data = await response.json()
    return data
  }

  useEffect(() => {
    if (customerPhone == "") {
      fetchAPI('http://localhost:8000/customer')
        .then((data) => {
          setNoPage(Math.ceil(data.data.length / limit));

          setCustomers(data.data.slice((page - 1) * limit, page * limit))
          console.log("123", data)
        })
        .catch((error) => {
          console.log(error.message)
        })
    } else {
      fetchAPI(`http://localhost:8000/customer?phone=${customerPhone}`)
        .then((data) => {
          setNoPage(Math.ceil(data.data.length / limit));

          setCustomers(data.data.slice((page - 1) * limit, page * limit))
          console.log(data.data)
        })
        .catch((error) => {
          console.error(error.message)
        });
    }
  }, [customerPhone, page, limit, varRefeshPage])

  useEffect(() => {
    fetchAPI('http://localhost:8000/orders')
      .then((data) => {
        setOrders(data.data)
        console.log(data)
      })
      .catch((error) => {
        console.error(error.message)
      });
  }, [])

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Customers</strong> <small>(Khách hàng)</small>
          </CCardHeader>
          <CCardBody>
            <h3 className="text-medium-emphasis" align="center">
              Danh sách khách hàng
            </h3>

            <Grid container sx={{ minWidth: 100 }} justifyContent="flex-end">
              <Grid item marginY={"auto"} mr={1}>
                <InputLabel>Show</InputLabel>
              </Grid>
              <Grid item>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={limit}
                  size="small"
                  onChange={handleChangeLimit}
                >
                  <MenuItem value={5}>5</MenuItem>
                  <MenuItem value={10}>10</MenuItem>
                  <MenuItem value={25}>25</MenuItem>
                  <MenuItem value={50}>50</MenuItem>
                </Select>
              </Grid>
              <Grid item marginY={"auto"} ml={1}>
                <InputLabel>customers</InputLabel>
              </Grid>
            </Grid>
            <Grid container mt={5} mb={1}>
              <Grid item xs={3}>
                <Button variant="contained" color="success" onClick={onBtnAddOrderClick}>Thêm</Button>
              </Grid>
              <Grid item xs={9}>
                <Grid container>
                  <Grid item xs={6} align="right">
                    <h4> Số điện thoại:</h4>
                  </Grid>
                  <Grid item xs={6} align="right">
                    <TextField
                      size="small"
                      label="Search Phone"
                      variant="outlined"
                      fullWidth
                      onChange={(event) => { setCustomerPhone(event.target.value) }}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>


            <CTable striped hover>
              <CTableHead color="dark">
                <CTableRow>
                  <CTableHeaderCell scope="col">Tên</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Số điện thoại</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Đơn hàng</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Địa chỉ</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {customers.map((customer, index) => {
                  return (
                    <CTableRow key={index}>
                      <CTableDataCell>{customer.fullName}</CTableDataCell>
                      <CTableDataCell>{customer.phone}</CTableDataCell>
                      <CTableDataCell>
                      <ButtonGroup variant="contained">
                        <Button color="info" className="text-white" value={index} onClick={() => { onBtnChiTietOrderClick(customer) }}>Chi tiết</Button>
                        </ButtonGroup>
                      </CTableDataCell>
                     
                      <CTableDataCell>
                        <button className="btn btn-info" onClick={() => { onBtnChiTietClick(customer) }}>Chi tiết </button>
                      </CTableDataCell>

                      <CTableDataCell>
                        <ButtonGroup variant="contained">
                          <Button color="info" className="text-white" value={index} onClick={() => { onBtnEditClick(customer) }}>Sửa</Button>
                          <Button className="bg-danger" value={index * index} onClick={() => { onBtnDeleteClick(customer) }}>Xóa</Button>
                        </ButtonGroup>
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
          </CCardBody>
          <ModalAddNew varRefeshPage={varRefeshPage} setOpenModalAdd={setOpenModalAdd} openModalAdd={openModalAdd} handleClose={handleClose} style={style} fetchAPI={fetchAPI} setVarRefeshPage={setVarRefeshPage} />

          <ModalEdit idEdit={idEdit} varRefeshPage={varRefeshPage} openModalEdit={openModalEdit} handleCloseEdit={handleCloseEdit}
            style={style} fetchAPI={fetchAPI} setVarRefeshPage={setVarRefeshPage} rowClicked={rowClicked}
          />

          <ModalDelete varRefeshPage={varRefeshPage} setVarRefeshPage={setVarRefeshPage} style={style} openModalDelete={openModalDelete} idDelete={idDelete} nameDelete={nameDelete} handleCloseDelete={handleCloseDelete} />
          <Grid xs={12}>
            <ModalDiachiCustumer emailCustumer={emailCustumer} Diachi={Diachi} openModalDiachi={openModalDiachi} handleCloseDiachi={handleCloseDiachi} />
          </Grid>
          <Grid xs={12}>
            <ModalOrderCustumer order={order} openModalOrder={openModalOrder} handleCloseOrder={handleCloseOrder} idCustumer ={idCustumer}/>
          </Grid>
        </CCard>
      </CCol>

    </CRow>
  )
}

export default Customers
