import { Rating } from "./Products"
import {
    Card,
    Col,
  } from "react-bootstrap";

interface product {
    id: number,
    title: string,
    rating: Rating
    price: number,
    image: string,
    quickView: (id: number) => void
}

export const Product = (
    {id,
    title,
    rating,
    price,
    image,
    quickView} : product)  => {
        return (
            <Col xs={12} md={3} lg={2} className="m-4" key={id}>
              <Card className="product" border="dark" onClick={() => quickView(id)}>
                <Card.Img
                  variant="top"
                  src={image}
                  width={200}
                  height={200}
                />
                <Card.Body>
                  <Card.Title className="text-truncate">
                    {title}
                  </Card.Title>
                  <Card.Subtitle>${price}</Card.Subtitle>
                  <Card.Text>
                    Rating: {rating.rate} ({rating.count})
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
        )
}