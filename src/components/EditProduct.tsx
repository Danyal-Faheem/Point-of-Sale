import { ChangeEvent, useEffect, useState } from "react";
import { Button, Modal, Container, Form } from "react-bootstrap";
import { debounce } from "lodash";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";

export const EditProduct = ({
  id,
  title,
  description,
  rating,
  price,
  image,
  category,
  show,
  handleClose,
  saveChanges,
}: any) => {
  // export const ProductQuickView = ({title, show, handleClose} :any ) => {
  const [isPriceValid, setIsPriceValid] = useState<boolean>(false);
  const [isImageValid, setIsImageValid] = useState<boolean>(false);
  //   const [submitFormData, setSumbitFormData] = useState<formData>();
  const validatePrice = debounce((event: ChangeEvent<HTMLInputElement>) => {
    const price: number = Number(event.target.value);

    if (price < 0.01) {
      console.log(price);
      toast.error("Price cannot be less than 0.01!");
    } else {
      setIsPriceValid(true);
    }
  }, 1000);

  const validateImage = (event: ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (e) => {
      const image = new Image();
      image.src = e.target.result;
      image.onload = () => {
        const { height, width } = image;
        if (height > 200 || width > 200) {
          toast.error("Image size cannot be greater than 200x200 resolution");
        } else {
          setIsImageValid(true);
        }
      };
    };
  };

  return (
    <Modal size="lg" show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Product</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form className="m-5" onSubmit={() => saveChanges(event, id)} action="#">
          <Form.Group>
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Title"
              name="title"
              defaultValue={title}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Description"
              name="description"
              defaultValue={description}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Price ($)</Form.Label>
            <Form.Control
              isValid={isPriceValid}
              name="price"
              type="number"
              step="0.01"
              min="0.01"
              placeholder="Price"
              required
              defaultValue={price}
              onChange={validatePrice}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Category</Form.Label>
            <Form.Control type="text" name="category" placeholder="Category" defaultValue={category} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Image</Form.Label>
            <Form.Control
              isValid={isImageValid}
              name="image"
              type="file"
              placeholder="image"
              onChange={validateImage}
            //   value={image}
            />
          </Form.Group>
          <Form.Group>
            <Button type="submit" variant="success">
              Save Changes
            </Button>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
