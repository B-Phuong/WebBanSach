import React from 'react'
import { Header } from './Header'
import { Container, Row, Col } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
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
                        <Row>
                            <Col md={2} className="sidebar">
                                <ul>
                                    <li><NavLink to={`/`}>Home</NavLink></li>
                                    <li><NavLink to={`/category`}>Quản lý danh mục</NavLink></li>
                                    <li><NavLink to={`/book`}>Quản lý sách</NavLink></li>
                                    <li><NavLink to={`/orders`}>Quản lý đơn hàng</NavLink></li>
                                </ul>
                            </Col>
                            <Col md={10} style={{ marginLeft: 'auto' }}>
                            {props.children}
                            </Col>
                        </Row>
                    </Container>
                    :
                    props.children
                    
            }

        </>
    )

}
export default Layout