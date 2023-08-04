import React from 'react';
import "../styles/RegisterStyle.css";
import { Form, Input, message } from 'antd';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch} from  'react-redux';
import { hideLoading, showLoading } from "../redux/feature/AlertSlice";

const RegisterPage = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  

  //on finish

  const onfinishHandler = async (values) => {
    try {
      dispatch(showLoading())
      const res = await axios.post("/api/v1/user/register", values);
      dispatch(hideLoading())
      if (res.data.success) {
        message.success("Register Successfully!");
        navigate("/login");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading())
      console.log(error);
      message.error("Something Went Wrong");
    }
  };

  return (
    <>
      <div className='from-container'>
        <Form layout='vertical' onFinish={onfinishHandler} className='register-from'>
          <h1 className='text-center'>Regusterfrom</h1>
          <Form.Item label="Name" name="name">
            <Input type='text' required />
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input type='email' required />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input type='password' required />
          </Form.Item>
          <Link to="/login" className='m-3'>Already user login here</Link>
          <button className='btn btn-primary' type='submit'>Register</button>
        </Form>
      </div>
    </>
  )
}

export default RegisterPage