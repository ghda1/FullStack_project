import React, { useContext } from "react";
import { Col, Container, Row } from "react-bootstrap";

import "./Product.css";
import { ProductContext } from "../../contexts/ProductContext";
import Product from "./Product";

export default function Products() {
  const { products } = useContext(ProductContext);

  if (products.length == 0) {
    return <h2>There is no products</h2>;
  }

  return (
    <Container>
      <Row>
        {products.map((product) => {
          return (
            <Col key={product.productId} xs={12} md={6} lg={4}>
              <Product product={product} />
            </Col>
          );
        })}
      </Row>
    </Container>
  );
}
