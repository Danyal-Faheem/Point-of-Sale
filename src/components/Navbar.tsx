import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

export const NavigationBar = () => {
  return (
    <Navbar bg="primary" data-bs-theme="dark">
      <Container fluid>
        <Navbar.Brand href="/home"><b>POS</b></Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="/products"><strong>Products</strong></Nav.Link>
          <Nav.Link href="/add"><strong>Add New Product</strong></Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};
