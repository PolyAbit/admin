import {
  Button,
  Image,
  Navbar,
  NavbarBrand,
  NavbarToggle,
  NavbarCollapse,
  Nav,
} from "react-bootstrap";
import { handleLogout } from "../utils/routing";

const NavBar = () => {
  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      bg="light"
      variant="light"
      className="border-bottom"
    >
      <NavbarBrand>
        <Nav.Link
          href="https://www.spbstu.ru"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src="src/assets/logo.png"
            alt="Логотип"
            className="d-inline-block align-top"
          />
        </Nav.Link>
      </NavbarBrand>
      <NavbarToggle aria-controls="responsive-navbar-nav" />
      <NavbarCollapse className="d-flex flex-row-reverse">
        <Nav className="ms-auto">
          <Button
            onClick={handleLogout}
            type="button"
            className="btn btn-secondary me-5"
          >
            Выйти
          </Button>
        </Nav>
        <Nav className="ms-auto">
          <Nav.Link>Направления</Nav.Link>
          <Nav.Link disabled>Абитуриенты</Nav.Link>
          <Nav.Link disabled>Управление</Nav.Link>
        </Nav>
      </NavbarCollapse>
    </Navbar>
  );
};

export default NavBar;
