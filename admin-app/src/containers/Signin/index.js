import React from 'react'
import Layout from '../../components/Layout'
import { Container, Form, Row, Col, Button } from 'react-bootstrap'
import { Input } from '../../components/UI/input'
import { login } from '../../actions';
import {useDispatch} from 'react-redux';
/**
* @author
* @function Signin
**/

export const Signin = (props) => {

  const dispatch = useDispatch();


  const userLogin = (e) => {

    e.preventDefault();

    const user = {
      email: 'souldippy@gmail.com',
      password: '123456'
    }
    dispatch(login(user));
  }
  return (
    <Layout>
      <Container>
        <Row style={{ marginTop: '50px' }}>
          <Col md={{ span: 6, offset: 3 }}>
            <Form onSubmit={userLogin}>
              <Input
                Label="Email"
                placeholder="Nhập email"
                value=""
                type="Email"
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
export default Signin