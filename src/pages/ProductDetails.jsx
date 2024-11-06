import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "react-bootstrap/Card";
import { Container } from "react-bootstrap";

import "../components/products/ProductDetails.css";
import { ProductContext } from "../contexts/ProductContext";
import { getSingleProduct } from "../services/productService";
import Material from "../components/Material";
import Colors from "../components/Colors";
import Sizes from "../components/Sizes";

function ProductDetails() {
  const { isLoading, setIsLoading, error, setError } =
    useContext(ProductContext);

  const { productId } = useParams();
  const [product, setProduct] = useState();

  const fetchData = async (productId) => {
    try {
      setIsLoading(true);
      const findProduct = await getSingleProduct(productId);
      setProduct(findProduct);
      setIsLoading(false);
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    fetchData(productId);
  }, [productId]);

  if (isLoading) {
    return <p>Product is Loading...</p>;
  }
  if (!product) {
    return <p>Product is not available.</p>;
  }
  if (error) {
    return <p>{error.message}</p>;
  }
  const { image, title, price, colors, sizes, material } = product;
  return (
    <Container className="productDetailsContainer">
      <Card className="productDetailsCard">
        <img className="productDetailsImage" src={image} alt={title} />
        <Card.Body className="productDetailsInfo">
          <h3 className="productDetailsTitle">{title}</h3>
          <Material material={material} />
          <Sizes sizes={sizes} />
          <Colors colors={colors} />
          <h4 className="productDetailsPrice">Price: {price} SAR</h4>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default ProductDetails;
