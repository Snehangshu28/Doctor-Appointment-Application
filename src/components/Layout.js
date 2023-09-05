import React from 'react';
import "../styles/LayoutStyle.css"
import { adminMenu, userMenu } from '../Data/data';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { message, Badge } from 'antd'

const Layout = ({ children }) => {
    const navigate = useNavigate();
    const { user } = useSelector(state => state.user)
    const location = useLocation()

    //logout function
    const handelLogout = () => {
        localStorage.clear();
        console.log(localStorage, "clear");
        message.success("logut successfully");
        navigate('/login')
    }

    //rendaring menu list
    const SidebarMenu = user?.isAdmin ? adminMenu : userMenu;


    return (
        <>
            <div className='main'>
                <div className='layoout'>
                    <div className='sidbar'>
                        <div className='logo'>
                            <h6>logo</h6>
                            <hr />
                        </div>
                        <div className='menu'>
                            {SidebarMenu.map(menu => {
                                const isActive = location.pathname === menu.path;
                                return (
                                    <>
                                        <div className={`menu-item ${isActive && 'active'}`}>
                                            <i className={menu.icon}></i>
                                            <Link to={menu.path}>{menu.name}</Link>
                                        </div>
                                    </>
                                )
                            })}
                            <div className={`menu-item `} onClick={handelLogout}>
                                <i className="fa-solid fa-right-from-bracket fa-rotate-180"></i>
                                <Link to="/login">Logout</Link>
                            </div>
                        </div>
                    </div>
                    <div className='content'>
                        <div className='header'>
                            <div className='header-content' style={{cursor:'pointer'}}>
                                <Badge count={user && user.notification.length}
                                 onClick={()=>{navigate('/notification')}}
                                 >
                                    <i className='fa-solid fa-bell'></i>
                                </Badge>
                                <Link to='/profile'>{user?.name}</Link>
                            </div>
                        </div>
                        <div className='body'>{children}</div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Layout