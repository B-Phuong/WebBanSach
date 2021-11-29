import React, { useState } from 'react'
import { Container, Form, Row, Col, Button } from 'react-bootstrap'
import Layout from '../../components/Layout';
import { Input } from '../../components/UI/input';
import { Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { signup } from '../../actions'
import { ToastContainer } from 'react-toastify';
/**
* @author
* @function Signup
**/

export const Signup = (props) => {

  const [tenNguoiDung, settenNguoiDung] = useState('');
  const [email, setEmail] = useState('');
  const [matKhau, setMatkhau] = useState('');
  const [error, setError] = useState('');
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);


  const userSignup = (e) => {
    e.preventDefault();
    const user = {
      tenNguoiDung, email, matKhau
    }
    dispatch(signup(user));
  }

  if (auth.authenticate) {
    return <Redirect to={`/`} />
  }

  // if (user.loading) {
  //   return <p>Loading...!</p>
  // }

  return (
    <>
      <Layout>
        <Container>
          {user.message}
          <Row style={{ marginTop: '50px', marginLeft: '265px' }}>
            <Col md={{ span: 6, offset: 3 }}>
              <Form onSubmit={userSignup}>
                <Input
                  Label="Tên người dùng"
                  placeholder="Nhập tên người dùng"
                  value={tenNguoiDung}
                  type="text"
                  onChange={(e) => settenNguoiDung(e.target.value)}
                />
                <Input
                  Label="Email"
                  placeholder="Nhập email"
                  value={email}
                  type="text"
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
      <ToastContainer />
    </>
  )

}
export default Signup