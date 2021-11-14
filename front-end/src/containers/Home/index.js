import React from 'react'
import Layout from '../../components/Layout'
import { Row, Col, Container } from 'react-bootstrap';
import './style.css'
/**
* @author
* @function Home
**/

export const Home = (props) => {
  return (
    <Layout>

      <Container fluid>
        <Row>
          <Col md={2} className="sidebar">Side bar</Col>
          <Col md={10}style={{marginleft:'auto'}}>Container</Col>
        </Row>
      </Container>
    </Layout>
  )

}

export default Home