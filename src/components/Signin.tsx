import axios from "axios";
import { Button, Container, Form } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";

export const Signin = () => {
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const { username, password } = Object.fromEntries(formData.entries());
    console.log(username, password);

    await axios
      .post("https://fakestoreapi.com/auth/login", {
        username: username,
        password: password,
      })
      .then((response) => {
        toast.success("Signed in successfully", {
          position: toast.POSITION.TOP_RIGHT,
        });
      })
      .catch((error) => {
        toast.error(error.response.data, {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };
  return (
    <>
      <Container>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Username"
              name="username"
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="password"
              placeholder="password"
              name="password"
              required
            />
          </Form.Group>
          <Form.Group>
            <Button type="submit" variant="primary">
              Signin
            </Button>
          </Form.Group>
        </Form>
      <ToastContainer />
      </Container>
    </>
  );
};
