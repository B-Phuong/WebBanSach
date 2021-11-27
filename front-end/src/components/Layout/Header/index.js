import React from 'react';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Link } from 'react-router-dom'
import { signout } from '../../../actions';
import ErrorHandler from '../../Error/ErrorHandler';
/**
* @author
* @function Header
**/

export const Header = (props) => {

    const auth = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const logout = () => {
        dispatch(signout());
    }
    const renderLoggedInLinks = () => {
        return (<Nav>
            <li className="nav-item">
                <span className="nav-link" >Chào {auth.user.tenNguoiDung}</span>
            </li>
            <li className="nav-item">
                <span className="nav-link" onClick={logout} >Signout</span>
            </li>
        </Nav>);
    }

    const renderNonLoggedInLinks = () => {
        return (<Nav>
            <li className="nav-item">
                <NavLink to="/signin" className="nav-link" >Signin</NavLink>
            </li>
            <li className="nav-item">
                <NavLink to="/signup" className="nav-link" >Signup</NavLink>
            </li>
        </Nav>);
    }

    return (
        <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark" style={{ zIndex: 1 }}>
            <ErrorHandler/>
            <Container fluid>
                

                {/* <Navbar.Brand href="#home">Admin DashBoard</Navbar.Brand> */}
                <a className="navbar-brand" href="/">BOOKSHOP</a>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                    </Nav>
                    {auth.authenticate ? renderLoggedInLinks() : renderNonLoggedInLinks()}

                </Navbar.Collapse>
            </Container>
        </Navbar>
    )

}