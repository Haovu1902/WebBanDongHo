import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { cilPen, cilDelete, cibAddthis } from '@coreui/icons'
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
import CIcon from '@coreui/icons-react'
import { Grid, TextField, Pagination, InputLabel, Select, MenuItem, Button, ButtonGroup } from '@mui/material'

import ModalAddNew from "./modal/ModalAddNew"
import ModalEdit from "./modal/ModalEdit"
import ModalDelete from "./modal/ModalDelete"
import ModalDiachi from "./modal/ChitietDiachi"
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 900,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  fontWeight: "bold",
 
};

const Orders = () => {
  const dispatch = useDispatch()
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([])
  const [filter, setFilter] = useState("");
  const [customers, setCustomers] = useState([])


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
  

  //Đóng Modal
  const handleClose = () => setOpenModalAdd(false);
  const handleCloseEdit = () => setOpenModalEdit(false);
  //Modal Add New
  const onBtnAddOrderClick = () => {
    console.log("Nút thêm được click")
    setOpenModalAdd(true)
  }

  //Modal Edit
  const [rowClicked, setRowClicked] = useState([]);
  const [orderDetailEdit, setorderDetailEdit] = useState([])
  const [idEdit, setIdEdit] = useState("");
  const [shippedDateEdit, setShippedDateEdit] = useState("");
  const [name1, setName] = useState("");

  const onBtnEditClick = (row) => {
    console.log("Nút sửa được click")
    console.log("ID: " + row._id)
    setOpenModalEdit(true)
    setorderDetailEdit(row.orderDetail)
    setRowClicked(row)
    setIdEdit(row._id)
    setShippedDateEdit(row.shippedDate)
    setName(row.customerInfo.fullName)
  }
// Chi tiết địa chỉ
const [openModalDiachi, setOpenModalDiachi] = useState(false);
const [diachi, setDiachi] = useState()
const [tongtien, setTongtien] = useState()
const [sanpham, setSanpham] = useState([])
const [chitiet, setChitiet] = useState()
  const onBtnChiTietClick = (row) =>{
    setOpenModalDiachi(true)
    setDiachi(row.customerInfo.address + ", " + row.customerInfo.city + ", " + row.customerInfo.country)
    setTongtien(row.cost)
    setSanpham(row.orderDetail)
    setChitiet(row.note)
  }
  const handleCloseDiachi = () => setOpenModalDiachi(false);
  //Modal Delete
  //ID
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [orderIdDelete, setIdorderIdDelete] = useState("");
  const [customerIdDelete, setCustomersIdDelete] = useState("");
  const [nameDelete, setNameDelete] = useState("")

  const handleCloseDelete = () =>{
    setOpenModalDelete(false)
  }

  const onBtnDeleteClick = (row) => {
    console.log("Nút xóa được click")
    console.log("ID: " + row._id)
    setOpenModalDelete(true)
    setIdorderIdDelete(row._id)
    setCustomersIdDelete(row.customerInfo._id)
    setNameDelete(row.customerInfo.fullName)
  }
  //LOAD  API
  const fetchAPI = async (url, body) => {
    const response = await fetch(url, body)
    const data = await response.json()
    return data
  }

  useEffect(() => {
    if (filter == "") {
      fetchAPI('http://localhost:8000/orders')
        .then((data) => {
          console.log(data)
          setNoPage(Math.ceil(data.data.length / limit));

          setOrders(data.data.slice((page - 1) * limit, page * limit))
          console.log(data)
        })
        .catch((error) => {
          console.error(error.message)
        });
    } else {
      var orderID = orders.filter((order, index) => {
        return order.customerInfo.fullName.toLowerCase().includes(filter.toLowerCase())
      })
      console.log(orderID)
      setOrders(orderID)
    }
  }, [filter, page, limit, varRefeshPage])

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Orders</strong> <small>(Các mặt hàng được orders)</small>
          </CCardHeader>
          <CCardBody>
            <h3 className="text-medium-emphasis" align="center">
              Danh sách mặt hàng được Orders
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
                <InputLabel>orders</InputLabel>
              </Grid>
            </Grid>

            {/* <Grid container mt={5} mb={1}>
              <Grid item xs={3}>
                <Button variant="contained" color="success" onClick={onBtnAddOrderClick}>Add new</Button>
              </Grid>
              <Grid item xs={9} align="right">
                <TextField size="small" label="Tên Khách hàng" variant="outlined" value={filter}
                  onChange={(event) => setFilter(event.target.value)} />
              </Grid>
            </Grid> */}

            <Grid container mt={5} mb={1}>
              <Grid item xs={3}>
                <Button variant="contained" color="success" onClick={onBtnAddOrderClick}>Thêm</Button>
              </Grid>
              <Grid item xs={9}>
                <Grid container>
                  <Grid item xs={6} align="right">
                    <h4> Tìm tên khách hàng:</h4>
                  </Grid>
                  <Grid item xs={6} align="right">
                  <TextField size="small" label="Tên Khách hàng" variant="outlined" value={filter} fullWidth
                  onChange={(event) => setFilter(event.target.value)} />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <Grid mt={3}>
            <CTable striped hover style={{fontSize: "15px"}}>
              <CTableHead color="dark">
                <CTableRow>
                  <CTableHeaderCell scope="col">Khách hàng</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Đơn hàng</CTableHeaderCell>
                  
                  <CTableHeaderCell scope="col">Số điện thoại</CTableHeaderCell>
                  <CTableHeaderCell scope="col" >Tổng tiền</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Ngày ship</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {orders.map((orders, index) => {
                  return (
                    <CTableRow key={index}>
                      <CTableDataCell >{orders.customerInfo.fullName} 
                       </CTableDataCell>
                      <CTableDataCell>
                    
                        <button className="btn btn-info" onClick={() => { onBtnChiTietClick(orders)}}>Chi tiết </button>
                       
                      </CTableDataCell>
                      <CTableDataCell>{orders.customerInfo.phone}</CTableDataCell>
                      <CTableDataCell>{numberWithCommas(orders.cost)}</CTableDataCell>
                      <CTableDataCell>{orders.shipperDate}</CTableDataCell>
                      <CTableDataCell>
                        <div>
                          <button className="btn btn-info " type="button" onClick={() => { onBtnEditClick(orders) }}>
                            <CIcon icon={cilPen} />
                          </button>
                          <button className="btn btn-danger " type="button" onClick={() => { onBtnDeleteClick(orders)}}>
                            <CIcon icon={cilDelete}/>
                          </button>
                        </div>
                      </CTableDataCell>
                    </CTableRow>
                  )
                })}
              </CTableBody>
            </CTable>
            </Grid>
            <Grid container mt={3} mb={2} justifyContent="flex-end">
              <Grid item >
                <Pagination count={noPage} color="primary" defaultPage={1} onChange={onChangePagination} />
              </Grid>
            </Grid>
          </CCardBody>
          <ModalAddNew varRefeshPage={varRefeshPage} setOpenModalAdd={setOpenModalAdd} openModalAdd={openModalAdd} handleClose={handleClose} style={style} fetchAPI={fetchAPI} setVarRefeshPage={setVarRefeshPage} />

          <ModalEdit name1={name1} idEdit={idEdit} shippedDateEdit={shippedDateEdit} varRefeshPage={varRefeshPage} openModalEdit={openModalEdit} handleCloseEdit={handleCloseEdit}
            style={style} fetchAPI={fetchAPI} setVarRefeshPage={setVarRefeshPage} rowClicked={rowClicked} orderDetailEdit = {orderDetailEdit}
          />

          <Grid xs={12}>
          <ModalDelete nameDelete = {nameDelete}  customerIdDelete= {customerIdDelete} varRefeshPage={varRefeshPage} setVarRefeshPage={setVarRefeshPage} openModalDelete={openModalDelete} orderIdDelete={orderIdDelete}  handleCloseDelete={handleCloseDelete} />
          </Grid>
          <Grid xs={12}>
          <ModalDiachi  openModalDiachi={openModalDiachi} diachi={diachi} chitiet={chitiet} tongtien = {tongtien} sanpham={sanpham}    handleCloseDiachi={handleCloseDiachi} />
          </Grid>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Orders
