
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import { NavLink, Link } from 'react-router-dom'
import './indexHome.css'
export const IndexHome = (props) => {
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

            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container>

                    <Link className="navbar-brand">Admin DashBoard</Link>
                    <input type='text' placeholder='Nhập từ khoa' />
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav>
                            <li >
                                <NavLink to="/signin" className="nav-link" >Signin</NavLink>
                            </li>
                            <li >
                                <NavLink to="/signup" className="nav-link" >Signup</NavLink>
                            </li>
                        </Nav>
                    </Navbar.Collapse>
                </Container>

            </Navbar>


        </>
    )

}
export default IndexHome