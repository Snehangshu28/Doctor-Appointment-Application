import React from 'react';
import { Form, Input, message } from 'antd';
import { useDispatch} from  'react-redux';
import { hideLoading, showLoading } from "../redux/feature/AlertSlice";
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";

const LoginPage = () => {

  const naviget = useNavigate();
  const dispatch = useDispatch();

  //on finish

  const handelLoder = () =>{
    window.location.reload();

  }

  const onFinistHandelar = async(values) => {
    try {
      dispatch(showLoading())
      const res = await axios.post('/api/v1/user/login', values);
      handelLoder();
      dispatch(hideLoading())
      if (res.data.success) {
        localStorage.setItem('token', res.data.token);
        message.success('Login Successfully');
        naviget('/');
      }else{
        message.error(res.data.message)
      }
      
    } catch (error) {
      dispatch(hideLoading())
      console.log(error)
      message.error('Somthing went wrong')
    }
  }

  return (
    <>
      <div className='from-container'>
        <Form layout='vertical' onFinish={onFinistHandelar} className='register-from'>
          <h1 className='text-center'>Login</h1>
          <Form.Item label="Email" name="email">
            <Input type='email' required />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input type='password' required />
          </Form.Item>
          <Link to="/register" className='m-3'>Not a user Register here</Link>
          <button className='btn btn-primary' type='submit'>Login</button>
        </Form>
      </div>
    </>
  )
}

export default LoginPage