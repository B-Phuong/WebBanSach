import React from 'react'
import Layout from '../../components/Layout'
import { Row, Col, Container } from 'react-bootstrap';
import './style.css'
import { NavLink } from 'react-router-dom'
/**
* @author
* @function Home
**/

export const Home = (props) => {
  return (
    <Layout>

      <Container fluid>
          <Col md={2} className="sidebar">
            <ul>
              <li><NavLink to={`/admin`}>Home</NavLink></li>
              <li><NavLink to={`/admin/book`}>Quản lý sách</NavLink></li>
              <li><NavLink to={`/orders`}>Quản lý đơn hàng</NavLink></li>
            </ul>
          </Col>
          {/* <Col md={10} style={{ marginLeft: 'auto' }}>Container</Col> */}
      </Container>
    </Layout>
  )

}

export default Home