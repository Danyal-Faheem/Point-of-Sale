import { ChangeEvent, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { debounce } from "lodash";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface formData {
  title: string;
  price: number;
  description?: string;
  category?: string;
  image: File;
}

export const AddProduct = () => {
  const [isPriceValid, setIsPriceValid] = useState<boolean>(false);
  const [isImageValid, setIsImageValid] = useState<boolean>(false);
  const navigate = useNavigate();
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

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formDataObj = Object.fromEntries(formData.entries());
    formDataObj.image = formDataObj.image.name;
    formDataObj["id"] = 21;
    formDataObj["rating"] = {
        rate: (Math.random() * (4.9 - 1.0) + 1.0).toFixed(1),
        count: Math.floor(Math.random() * 100) + 1
    };

    localStorage.setItem("product", JSON.stringify(formDataObj));
    
    await axios
      .post("https://fakestoreapi.com/products", formDataObj)
      .then((response) => {
        console.log(response.data);
        toast.success("Product Successfully Added!",  {
            position: toast.POSITION.TOP_LEFT,
          });
        navigate('/products',{
            state: formDataObj
        })
      })
      .catch((error) => {
        console.log(error);
        toast.error("An Error occurred in adding product!",  {
            position: toast.POSITION.TOP_LEFT,
          });
      });
  };

  return (
    <Container>
      <h2>Add Product</h2>
      <Form className="m-5" onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Title</Form.Label>
          <Form.Control type="text" placeholder="Title" name="title" required />
        </Form.Group>
        <Form.Group>
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            placeholder="Description"
            name="description"
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
            onChange={validatePrice}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Category</Form.Label>
          <Form.Control type="text" name="category" placeholder="Category" />
        </Form.Group>
        <Form.Group>
          <Form.Label>Image</Form.Label>
          <Form.Control
            isValid={isImageValid}
            name="image"
            type="file"
            placeholder="image"
            required
            onChange={validateImage}
          />
        </Form.Group>
        <Form.Group>
          <Button type="submit" variant="primary">
            Add Product!
          </Button>
        </Form.Group>
      </Form>
      <ToastContainer />
    </Container>
  );
};
