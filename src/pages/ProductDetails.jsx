import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "react-bootstrap/Card";
import { Container } from "react-bootstrap";

import Image from "../components/Image";
import Title from "../components/Title";
import Price from "../components/Price";
import { ProductContext } from "../contexts/ProductContext";
import { getSingleProduct } from "../services/ProductService";

function ProductDetails() {
  const { isLoading, setIsLoading, error, setError } =
    useContext(ProductContext);

  const { productId } = useParams();
  const [product, setProduct] = useState(null);

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

  return (
    <Container>
      <Card>
        <Image image={product.image} title={product.title} />
        <Card.Body className="productInfo">
          <Title title={product.title} />
          <Price price={product.price} />
        </Card.Body>
      </Card>
    </Container>
  );
}

export default ProductDetails;
