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
    <Card class="card">
      <Image image={image} title={title} />
      <Card.Body>
        <Title title={title} />
        <Price price={price} />
        <Button
          variant="secondary"
          onClick={() => navigate(`/productDetails/${productId}`)}
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
