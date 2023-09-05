import React from 'react'
import Layout from './../components/Layout';
import { Tabs, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { showLoading, hideLoading } from '../redux/feature/AlertSlice';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const NotificationPage = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate()

  //handel read notification
  const handelMarkAllRead = async() =>{
    try {
      dispatch(showLoading());
      const res = await axios.post('./api/v1/user/get-all-notifiaction',
       {
        userId:user._id
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      }
      );
      dispatch(hideLoading())
      if(res.data.success){
        message.success(res.data.message)
      } else{
        message.error(res.data.message)
      }
    } catch (error) {
      dispatch(hideLoading())
      console.log(error)
      message.error('Somthing went wrong')
    }
  }

  //delete notifications
  const handelDeleteAllRead = async() =>{
    try {
      dispatch(showLoading())
      const res = await axios.post('/api/v1/user/delete-all-notifiaction', {userId:user._id},{
        headers:{
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      dispatch(hideLoading())
      if(res.data.success){
        message.success(res.data.message)
      }else{
        message.error(res.data.message)
      }
    } catch (error) {
      console.log(error)
      message.error('Somthing went wrong in notification')
    }
  }

  return (
    <Layout>
        <h4 className='p-3 text-center'>notification page</h4 >
        <Tabs>
          <Tabs.TabPane tab='unRead' key={0}>
            <div className='d-flex justify-content-end'>
              <h4 className='p-2' onClick={handelMarkAllRead}>Mark All read</h4>
            </div>
            {
              user?.notification.map(notificationMsg =>(
                <div className='card'style={{cursor:"pointer"}}>
                  <div
                   className='card-text' 
                   onClick={()=>navigate(notificationMsg.onClickPath)} 
                   >
                    {notificationMsg.message}
                  </div>
                </div>
              ))
            }
          </Tabs.TabPane>
          <Tabs.TabPane tab='Read' key={1}>
            <div className='d-flex justify-content-end'>
              <h4 className='p-2 text-primary' style={{cursor:"pointer"}} onClick={handelDeleteAllRead}>Delete All read</h4>
            </div>
            {
              user?.seennotification.map(notificationMsg =>(
                <div className='card'style={{cursor:"pointer"}}>
                  <div 
                  className='card-text'
                  onClick={()=>navigate(notificationMsg.onClickPath)} 
                  >
                    {notificationMsg.message}
                  </div>
                </div>
              ))
            }
          </Tabs.TabPane>
        </Tabs>
    </Layout>
  )
}

export default NotificationPage
