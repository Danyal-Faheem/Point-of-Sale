import axios from "axios";
import { useState, useEffect, ChangeEvent } from "react";
import {
  Button,
  Container,
  Dropdown,
  Form,
  Row,
} from "react-bootstrap";
import { ProductQuickView } from "./ProductQuickView";
import { ToastContainer, toast } from "react-toastify";
import { Product } from "./Product";
import { EditProduct } from "./EditProduct";

// Our main interface to fetch the products from the API
export interface product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: Rating;
}

// Rating interface 
export interface Rating {
  rate: number;
  count: number;
}

export const Products = () => {
  const [products, setProducts] = useState<product[]>([]);
  const [quickViewProduct, setQuickViewProduct] = useState<product>();
  const [editProduct, setEditProduct] = useState<product>();
  const [quickViewToggle, setQuickViewToggle] = useState<boolean | undefined>(
    false
  );
  const [editProductToggle, setEditProductToggle] = useState<
    boolean | undefined
  >(false);
  const [copyProducts, setCopyProducts] = useState<product[]>([]);
  const [categories, setCategories] = useState<string[]>();
  useEffect(() => {
    const getProducts = async () => {
      await axios
        .get<product[]>(`https://fakestoreapi.com/products`)
        .then((response) => {
          setProducts(response.data);
          setCopyProducts(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    const getCategories = async () => {
      await axios
        .get<string[]>(`https://fakestoreapi.com/products/categories`)
        .then((response) => {
          setCategories(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getProducts();
    getCategories();
  }, []);
  const quickView = (id: number) => {
    setQuickViewProduct(products.find((x) => x.id === id));
    setQuickViewToggle(true);
  };

  const closeModal = () => {
    setQuickViewToggle(false);
  };

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const query = event.currentTarget.value;
    // Create copy of item list
    // console.log(copyProducts);

    let filteredProducts = [...copyProducts];
    // Include all elements which includes the search query
    filteredProducts = filteredProducts.filter((item) => {
      return item.title.toLowerCase().indexOf(query.toLowerCase()) !== -1;
    });
    // Trigger render with updated values
    setProducts(filteredProducts);
  };

  const handleCategoryFilter = (event: any) => {
    const query = event;

    // Create copy of item list
    // console.log(copyProducts);

    let filteredProducts = [...copyProducts];
    // Include all elements which includes the search query
    filteredProducts = filteredProducts.filter((item) => {
      // console.log(item.category, query);

      return item.category === query;
    });
    // Trigger render with updated values
    setProducts(filteredProducts);
  };

  const deleteProduct = async (id: number) => {
    closeModal();
    let filteredProducts = [...copyProducts];
    // Include all elements which includes the search query
    filteredProducts = filteredProducts.filter((item) => {
      // console.log(item.category, query);

      return item.id !== id;
    });
    await axios
      .delete(`https://fakestoreapi.com/products/${id}`)
      .then((response) => {
        toast.success("Product Successfully Deleted!", {
          position: toast.POSITION.TOP_LEFT,
        });
      })
      .catch((error) => {
        toast.error("Error in deleting product!", {
          position: toast.POSITION.TOP_LEFT,
        });
      });
    // Trigger render with updated values
    setProducts(filteredProducts);
    setCopyProducts(filteredProducts);
  };


  const handleEdit = (id: number) => {
    closeModal();
    setEditProduct(products.find((x) => x.id === id))
    setEditProductToggle(true);
  }

  const saveChanges = async (event : any, id : number) => {
    event.preventDefault()
    setEditProductToggle(false);
    const updatedProduct = new FormData(event.target);
    const updatedProductObj = Object.fromEntries(updatedProduct.entries());
    let productToUpdate : any = products.find((x) => x.id === id);
    productToUpdate.title = updatedProductObj.title;
    productToUpdate.category = updatedProductObj.category;
    productToUpdate.description = updatedProductObj.description;
    productToUpdate.price = updatedProductObj.price;
    setProducts(products);
    await axios
      .patch(`https://fakestoreapi.com/products/${id}`, productToUpdate)
      .then((response) => {
        toast.success("Product Successfully Updated!", {
          position: toast.POSITION.TOP_LEFT,
        });
      })
      .catch((error) => {
        toast.error("Error in updating product!", {
          position: toast.POSITION.TOP_LEFT,
        });
      });
  }


  return (
    <Container fluid>
      <Form className="d-flex m-4">
        <Dropdown onSelect={handleCategoryFilter}>
          <Dropdown.Toggle id="dropdown-basic">Categories</Dropdown.Toggle>
          <Dropdown.Menu>
            {categories?.map((category: string) => {
              return (
                <Dropdown.Item eventKey={category} key={category}>
                  {category}
                </Dropdown.Item>
              );
            })}
          </Dropdown.Menu>
        </Dropdown>
        <Form.Control
          type="search"
          placeholder="Search"
          className="me-2 m-2"
          aria-label="Search"
          onChange={handleSearch}
        />
        <Button>Search</Button>
      </Form>
      <Row>
        {products.map((product: product) => {
          return <Product {...product} quickView={quickView} key={product.id} />;
        })}
      </Row>
      {quickViewToggle && (
        <ProductQuickView
          {...quickViewProduct}
          show={quickViewToggle}
          handleClose={closeModal}
          deleteProduct={deleteProduct}
          handleEdit={handleEdit}
        />
      )}
      {editProductToggle && (
        <EditProduct
          {...editProduct}
          show={editProductToggle}
          handleClose={() => setEditProductToggle(false)}
          saveChanges={saveChanges}
        />
      )}
      <ToastContainer />
    </Container>
  );
};
