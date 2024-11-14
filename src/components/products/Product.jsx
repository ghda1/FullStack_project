import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

import "./Product.css";
import Image from "../Image";
import Title from "../Title";
import Price from "../Price";

export default function Product(props) {
  const { product } = props;
  const { productId, image, title, price } = product;
  const navigate = useNavigate();

  return (
    <Card className="productCard">
      <Image image={image} title={title} />
      <Card.Body className="productInfo">
        <Title title={title} />
        <Price price={price} />
        <Button
          className="details-btn"
          variant="secondary"
          onClick={() => navigate(`/productDetails`, { state: productId })}
        >
          Details
        </Button>
      </Card.Body>
    </Card>
  );
}

Product.propTypes = {
  product: PropTypes.object,
};
