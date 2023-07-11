import { Button, Modal } from "react-bootstrap";
import { Rating } from "./Products";

interface quickView {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: Rating;
  show: boolean | undefined;
  handleClose: () => void;
}

export const ProductQuickView = ({
  id,
  title,
  description,
  rating,
  price,
  image,
  category,
  show,
  handleClose,
  deleteProduct,
  handleEdit
}: any) => {
  // export const ProductQuickView = ({title, show, handleClose} :any ) => {

  return (
    <Modal size="lg" show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          {title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <img src={image}></img>
        <h2>${price}</h2>
        <h3>
          Rating: {rating.rate} ({rating.count})
        </h3>
        <p><b>{category}</b></p>
        <p>{description}</p>
        <Button variant="primary" onClick={() => handleEdit(id)}>
          Edit Product
        </Button>
        <Button variant="danger" onClick={() => deleteProduct(id)}>
          Delete Product
        </Button>
        
      </Modal.Body>
    </Modal>
  );
};
