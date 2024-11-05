import { useContext } from "react";
import { Col, Container, Row } from "react-bootstrap";

import "./Product.css";
import { ProductContext } from "../../contexts/ProductContext";
import Product from "./Product";

export default function Products() {
  const { products, isLoading, error } = useContext(ProductContext);

  if (isLoading) {
    return <h2>Products is Loading...</h2>;
  }

  if (error) {
    return <h2>{error.message}</h2>;
  }

  if (products.length == 0) {
    return <h2>There is no products</h2>;
  }

  return (
    <Container className="container">
      <Row>
        {products.map((product) => {
          return (
            <Col key={product.productId} xs={6} md={4} lg={3}>
              <Product product={product} />
            </Col>
          );
        })}
      </Row>
    </Container>
  );
}
