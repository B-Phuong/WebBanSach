import React from 'react'
import { Container, Form, Row, Col, Button } from 'react-bootstrap'
import Layout from '../../components/Layout';
import { Input } from '../../components/UI/input';
import { Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux';
/**
* @author
* @function Signup
**/

export const Signup = (props) => {
  const auth = useSelector(state => state.auth);
  if(auth.authenticate){
    return <Redirect to={`/`}/>
  }




  return (
    <Layout>
      <Container>
        <Row style={{ marginTop: '50px' }}>
          <Col md={{ span: 6, offset: 3 }}>
            <Form>
              <Input
                Label="Tên người dùng"
                placeholder="Nhập tên người dùng"
                value=""
                type="text"
                onChange={() => { }}
              />
              <Input
                Label="Email"
                placeholder="Nhập email"
                value=""
                type="text"
                onChange={() => { }}
              />
              <Input
                Label="Mật khẩu"
                placeholder="Nhập mật khẩu"
                value=""
                type="password"
                onChange={() => { }}
              />
              <Form.Group className="mb-3" >
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Col>
          
        </Row>

      </Container>
    </Layout>
  )

}
export default Signup