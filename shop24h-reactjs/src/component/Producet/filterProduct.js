import * as React from 'react';
import { Card, CardContent, Stack, Rating, FormLabel, FormControl, ButtonBase, Box, styled, LinearProgress, Typography, RadioGroup, FormGroup, Radio, FormControlLabel, Checkbox, Paper, InputBase, Pagination, Grid } from '@mui/material';
import { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from "reactstrap";
import { useDispatch, useSelector } from "react-redux"
import { Key } from '@mui/icons-material';


function FilterProduct() {
  const dispatch = useDispatch();
  const { nameInput, minInput, maxInput, type } = useSelector((reduxData) => reduxData.taskReducer);

  const inpNameChang = (event) => {
    dispatch({
      type: "VALUE_NAME",
      payload: {
        nameInput: event.target.value
      }
    })

  }
  const inpMimOnchange = (event) => {
    dispatch({
      type: "VALUE_MIN",
      payload: {
        minInput: event.target.value
      }
    })
  }
  const inpMaxOnchange = (event) => {
    dispatch({
      type: "VALUE_MAX",
      payload: {
        maxInput: event.target.value
      }
    })
  }
  const onChangeRadio = (event) => {
    console.log("123")
    dispatch({
      type: "VALUE_RADIO",
      payload: {
        type: event.target.value
      }
    })
  }
  const itemData = [
    {
      img: 'https://cdn.shopdongho.com/2018/09/dong-ho-casio-1.png',
      title: 'Breakfast',
    },
    {
      img: 'https://cdn.shopdongho.com/2018/09/dong-ho-ediffice.png',
      title: 'Burger',
    },
    {
      img: 'https://cdn.shopdongho.com/2018/09/dong-ho-g-stock.png',
      title: 'Camera',
    },
    {
      img: 'https://cdn.shopdongho.com/2018/09/dong-ho-sheen.png',
      title: 'Coffee',
    },
    {
      img: 'https://cdn.shopdongho.com/2019/03/dong-ho-casio-ltp.png',
      title: 'Coffee',
    },
    {
      img: 'https://cdn.shopdongho.com/2019/03/dong-ho-casio-mtp.png',
      title: 'Coffee',
    },
    {
      img: 'https://cdn.shopdongho.com/2018/09/dong-ho-sheen.png',
      title: 'Coffee',
    },
    {
      img: 'https://cdn.shopdongho.com/2020/04/logo-thuong-hieu-dong-ho-julius-1.png',
      title: 'Coffee',
    },
    {
      img: 'https://cdn.shopdongho.com/2018/09/dong-ho-ogival.png',
      title: 'Coffee',
    },


  ];

  return (
    <Col className='container' style={{ background: "bisque" }}>
      <Row style={{ marginTop: "100px" }}>
        {itemData.map((image) => (
          <Col className="p-1">
            <a href='/product' sx={{ color: "black" }}>
              <img src={image.img} alt='1' style={{ width: "90px", background: "black" }} />
            </a>
          </Col>
        ))}
        <Row>
          <Col>
            <Row >
              <Row>
                <Col className="col-sm-6 p-2" sm={6}  style={{ marginTop: "25px", display: "grid", justifyContent:" space-around"}}>
                  <Row>
                    <Col className="col-sm-5">
                      <Typography variant="h6" component="div">
                        Tên sản phẩm
                      </Typography>
                    </Col>
                    <Col className="col-sm-7">
                      <Paper
                        component="form"
                        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center' }}
                        fullWidth
                      >
                        <InputBase
                          placeholder="Tên" onChange={inpNameChang} value={nameInput} fullWidth
                        />
                      </Paper>
                    </Col>
                  </Row>
                </Col>
                <Col style={{ marginTop: "25px" }} className="col-sm-6 p-2">
                  <Row>
                    <Col className="col-sm-5">
                      <Typography variant="h6" component="div">
                        Giá sản phẩm
                      </Typography>
                    </Col>
                    <Col className="col-sm-7">
                      <Typography variant="h5" component="div">
                        <Paper
                          component="form"
                          sx={{ p: '2px 4px', display: 'flex', alignItems: 'center' }}
                          fullWidth
                        >
                          <InputBase
                            placeholder="Min"
                            onChange={inpMimOnchange}
                            value={minInput}

                            width="50%"

                          />
                          <InputBase
                            placeholder="Max"
                            onChange={inpMaxOnchange}
                            value={maxInput}

                            width="50%"
                          />
                        </Paper>
                      </Typography>
                    </Col>
                  </Row>
                </Col>
              </Row>
              <Row  style={{ display: "flex", justifyContent: "space-around", textAlign: "center", marginTop:"20px" }}>
                <Typography variant="h5" component="div">
                  <FormControl>
                    <FormLabel id="demo-radio-buttons-group-label"></FormLabel>
                    <RadioGroup
                      row
                      aria-labelledby="demo-radio-buttons-group-label"
                      name="radio-buttons-group"
                      defaultValue=""
                      onChange={onChangeRadio}
                    >
                      <FormControlLabel value="" control={<Radio />} label="Tất cả" />
                      <FormControlLabel value="643a2c18bfaae650b7b12e71" control={<Radio />} label="Đồng hồ cơ" />
                      <FormControlLabel value="643a2dab8a97a768f08d0117" control={<Radio />} label="Đồng hồ điện" />

                    </RadioGroup>
                  </FormControl>
                </Typography>
              </Row>

            </Row>
          </Col>
        </Row>
      </Row>
    </Col>
  )
}
export default FilterProduct

