import React from 'react'
import Layout from './../components/Layout';
import { Col, Form, Row, Input, TimePicker, message } from 'antd';
import {useSelector, useDispatch} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { hideLoading, showLoading } from '../redux/feature/AlertSlice';
import  axios from 'axios';

const ApplyDoctor = () => {

  const {user} = useSelector(state => state.user)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //handel finish
  const handelFinist = async(values) => {
      try {
        dispatch(showLoading())
        const res = await axios.post('/api/v1/user/apply-doctor', {...values, userId:user._id},{
          headers:{
            Authorization:`Bearer ${localStorage.getItem('token')}`
          }
        })
        dispatch(hideLoading())
        if (res.data.success) {
          message.success(res.data.success)
          navigate('/')
        }else{
          message.error(res.data.success)
        }
      } catch (error) {
        dispatch(hideLoading())
        console.log(error);
        message.error('Somthing Went Wrrong')
      }
  }

  return (
    <Layout>
      <h1 className='text-center'>Apply Doctor</h1>
      <Form layout='vertical' onFinish={handelFinist} className='m-3'>
        <h4 className=''>personal Detalis :</h4>
        <Row gutter={20}>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="First Name"
              name='firstName'
              required
              rules={[{ required: true }]}
            >
              <Input type='text' placeholder='your name' />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Last Name"
              name='lastName'
              required
              rules={[{ required: true }]}
            >
              <Input type='text' placeholder='your last name' />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Phone Number"
              name='phone'
              required
              rules={[{ required: true }]}
            >
              <Input type='text' placeholder='your Phome Number' />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Email"
              name='email'
              required
              rules={[{ required: true }]}
            >
              <Input type='text' placeholder='your email' />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Website"
              name='website'
            >
              <Input type='text' placeholder='your Website' />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>

            <Form.Item
              label="Address"
              name='address'
              required
              rules={[{ required: true }]}
            >
              <Input type='text' placeholder='your address' />
            </Form.Item>
          </Col>
        </Row>
        <h4 className=''>personal Detalis :</h4>
        <Row gutter={20}>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Specialization"
              name='specialization'
              required
              rules={[{ required: true }]}
            >
              <Input type='text' placeholder='your specialization' />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Experience"
              name='experience'
              required
              rules={[{ required: true }]}
            >
              <Input type='text' placeholder='experience' />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Fees Per Cunsaltation"
              name='feesPerCunsaltation'
              required
              rules={[{ required: true }]}
            >
              <Input type='text' placeholder='Cunsaltation' />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Timings"
              name='timings'
              required
              rules={[{ required: true }]}
            >
              <TimePicker.RangePicker format="HH:mm"/>
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}></Col>
          <Col xs={24} md={24} lg={8}>
            <div className='d-flex justify-content-end'>
              <button className='btn btn-primary from-btn' type='submit'>Submit</button>
            </div>
          </Col>
        </Row>
      </Form>
    </Layout>
  )
}

export default ApplyDoctor;
