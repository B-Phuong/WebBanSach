
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Link } from 'react-router-dom'
import { signout } from '../../../actions';
import React from 'react';
import './indexHome.css'
export const IndexHome = (props) => {
    const auth = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const logout = () => {
        dispatch(signout());
    }
    const renderLoggedInLinks = () => {
        return (<Nav>
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
        <>

            {/* <Nav>
                <NavLink to="">HTML</NavLink>
                <NavLink to="">CSS</NavLink>
                <NavLink to="">JavaScript</NavLink>
                <NavLink to="">MySQL</NavLink>
                <div>nnnn</div>
                <NavLink to="">PHP</NavLink>
            </Nav> */}

            {/* <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container>

                    <input type='text' placeholder='Nhập từ khoa' />
                    <div className='icon-user'> cccc
                        <ion-icon name="people-outline"></ion-icon>

                    </div>

                </Container>

            </Navbar> */}

            <Navbar className="navbar navbar-expand-sm navbar-dark bg-primary">
            <Container fluid>
                <a className="navbar-brand" href="/">BOOKSHOP</a>

                {/* navbar-nav  */}
                {auth.authenticate ? renderLoggedInLinks() : renderNonLoggedInLinks()}
            </Container>
            </Navbar>
            <script type="module" src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"></script>
            <script nomodule src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"></script>


        </>
    )

}
export default IndexHome