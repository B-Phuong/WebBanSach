import React from 'react'
import { Header } from './Header'
import { Container, Row, Col } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import './style.css';
/**
* @author
* @function Layout
**/

export const Layout = (props) => {
    return (
        <>
            <Header />
            {
                props.sidebar ?
                    <Container fluid>
                        <Col md={2} className="sidebar">
                            <ul>
                                <li><NavLink to={`/admin/book`}>Quản lý sách</NavLink></li>
                                <li><NavLink to={`/admin/orders`}>Quản lý đơn hàng</NavLink></li>
                                <li><NavLink to={`/admin/chart`}>Thống kê</NavLink></li>
                            </ul>
                        </Col>
                        <Col md={10} style={{ marginLeft: 'auto' }}>
                            {props.children}
                        </Col>
                    </Container>
                    :
                    props.children

            }

        </>
    )

}
export default Layout