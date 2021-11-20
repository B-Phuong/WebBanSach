
import React, { useEffect, useState } from 'react';
import './indexHome.css';
import bookLogo from '../../../images/logo/logo.png';
// import goldenStar from '../../images/logo/golden-star.png';
import { IoIosArrowDown, IoIosCart, IoIosSearch } from 'react-icons/io';
import {
    Modal,
    MaterialInput,
    MaterialButton,
    DropdownMenu
} from '../../MaterialUI';

import { useDispatch, useSelector } from 'react-redux';
import { homelogin, signout } from '../../../actions'
/**
* @author
* @function Header
**/

const IndexHome = (props) => {

    const [loginModal, setLoginModal] = useState(false);
    const [email, setEmail] = useState('');
    const [matKhau, setmatKhau] = useState('');
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);
    const userLogin = () => {
        dispatch(homelogin({ email, matKhau }))
    }

    const logout = () => {
        dispatch(signout());
      };

    const renderLoggedInMenu = () => {
        return(
            <DropdownMenu
            menu={<a className="tenNguoiDung">Chào {auth.user.tenNguoiDung}</a>}
            menus={[
                { label: 'Thông tin cá nhân', href: '', icon: null },
                { label: 'Chi tiết đơn hàng', href: '', icon: null },
                { label: "Logout" ,href:'', icon: '', onClick: logout }
            ]}
            
        />
        
        );
    }

    const renderNonLoggedInMenu = () => {
        return (
            <DropdownMenu
                menu={
                    <a className="loginButton" onClick={() => setLoginModal(true)}>
                        Login
                    </a>
                }
                firstMenu={
                    <div className="firstmenu">
                        <span>New Customer?</span>
                        <a style={{ color: '#2874f0' }}>Sign Up</a>
                    </div>
                }
            />
        );
    }
    return (
        <div className="header">
            <Modal
                visible={loginModal}
                onClose={() => setLoginModal(false)}
            >
                <div className="authContainer">
                    <div className="row">
                        <div className="leftspace">
                            <h2>Login</h2>
                            <p>Đăng nhập bằng tài khoản của bạn để mua hàng thuận tiện hơn nhé!</p>
                        </div>
                        <div className="rightspace">


                            <MaterialInput
                                type="text"
                                label="Nhập Email của bạn"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />

                            <MaterialInput
                                type="matKhau"
                                label="Nhập mật khẩu"
                                value={matKhau}
                                onChange={(e) => setmatKhau(e.target.value)}
                            />
                            <MaterialButton
                                title="Đăng nhập"
                                bgColor="#fb641b"
                                textColor="#ffffff"
                                style={{
                                    margin: '40px 0 20px 0'
                                }}
                                onClick={userLogin}
                            />

                            <p>Hoặc</p>

                            <MaterialButton
                                title="Đăng nhập bằng OTP"
                                bgColor="#ffffff"
                                textColor="#fb641b"
                                style={{
                                    margin: '10px 0'
                                }}

                            />


                        </div>
                    </div>
                </div>
            </Modal>
            <div className="subHeader">
                <div className="logo">
                    <a href="">
                        <img src={bookLogo} className="logoimage" alt="" />
                    </a>
                    <a style={{ marginTop: '-10px' }}>
                        <span className="exploreText">Book</span>
                        <span className="plusText">Shop</span>
                    </a>
                </div>
                <div style={{
                    padding: '0 10px'
                }}>
                    <div className="searchInputContainer">
                        <input
                            className="searchInput"
                            placeholder={'Nhập sách bạn muốn tìm kiếm'}
                        />
                        <div className="searchIconContainer">
                            <IoIosSearch style={{
                                color: '#2874f0'
                            }} />
                        </div>

                    </div>
                </div>
                <div className="rightMenu">
                {
                    auth.authenticate ?
                    renderLoggedInMenu() : renderNonLoggedInMenu()
                }
                    
                    <div>
                        <a className="cart">
                            <IoIosCart />
                            <span style={{ margin: '0 10px' }}>Cart</span>
                        </a>
                    </div>
                </div>

            </div>
        </div>
    )

}

export default IndexHome