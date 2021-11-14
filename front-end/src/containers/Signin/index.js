import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout'
import { Container, Form, Row, Col, Button } from 'react-bootstrap'
import { Input } from '../../components/UI/input'
import { login } from '../../actions';
import {useDispatch, useSelector} from 'react-redux';
import { Redirect } from 'react-router-dom'

/**
* @author
* @function Signin
**/

export const Signin = (props) => {

  const[email, setEmail] = useState('');
  const[matKhau, setMatkhau] = useState('');
  const[error, setError] = useState('');
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const userLogin = (e) => {

    e.preventDefault();

    const user = {
      email, matKhau
    }
    dispatch(login(user));
  }
  if(auth.authenticate){
    return <Redirect to={`/`}/>
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
                value={email}
                type="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                Label="Mật khẩu"
                placeholder="Nhập mật khẩu"
                value={matKhau}
                type="password"
                onChange={(e) => setMatkhau(e.target.value)}
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