import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import { NavLink, Link } from "react-router-dom";
import "./indexHome.css";
import { IoIosArrowDown, IoIosCart, IoIosSearch } from 'react-icons/io';
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

      {/* <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container>

                    <input type='text' placeholder='Nhập từ khoa' />
                    <div className='icon-user'> cccc
                        <ion-icon name="people-outline"></ion-icon>

                    </div>

                </Container>

            </Navbar> */}

      <Navbar className="navbar navbar-expand-sm navbar-dark bg-primary">
        <a className="navbar-brand" href="#">
          Books
        </a>

        {/* navbar-nav  */}
        <ul className="navbar-nav mr-auto">
          <li className=" nav-item">
            <a className="nav-link">Java</a>
          </li>
          <li className="nav-item">
            <a className="nav-link">C/C++</a>
          </li>
        </ul>

        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <a className="nav-link">Tom</a>
          </li>
          <li className="nav-item">
            <a className="nav-link">Logout</a>
          </li>
          <div>
            <a className="cart">
              <IoIosCart />
              <span style={{ margin: "0 10px" }}>Cart</span>
            </a>
          </div>
        </ul>
      </Navbar>
      <script
        type="module"
        src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"
      ></script>
      <script
        nomodule
        src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"
      ></script>
    </>
  );
};
export default IndexHome;
