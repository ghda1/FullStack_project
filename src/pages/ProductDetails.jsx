import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Card from "react-bootstrap/Card";
import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";

import "../components/products/ProductDetails.css";
import { ProductContext } from "../contexts/ProductContext";

import Material from "../components/Material";
import ProductSelect from "../components/ProductSelect";
import { CartContext } from "../contexts/CartContext";
import { getSingleSize } from "../services/sizeService";
import { UserContext } from "../contexts/UserContext";
import { getSingleColor } from "../services/colorService";
import PageTitle from "../components/PageTitle";
import { getSingleProduct } from "../services/productService";

function ProductDetails() {
  const { isLoading, setIsLoading, error, setError } =
    useContext(ProductContext);

  const [errors, setErrors] = useState({});

  const { token } = useContext(UserContext);
  const stateLocation = useLocation();

  const navigate = useNavigate();

  const { addProductToCart } = useContext(CartContext);
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState([]);
  const [selectedColor, setSelectedColor] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const findProduct = await getSingleProduct(
          stateLocation.state.data.productId
        );
        setProduct(findProduct);
        setIsLoading(false);
      } catch (error) {
        setError(error);
      }
    };

    fetchData();
  }, [stateLocation, setIsLoading, setError]);

  const sizeOptions =
    product?.sizes.map((size) => ({
      value: size.sizeId,
      label: size.value,
    })) || [];

  const colorOptions =
    product?.colors.map((color) => ({
      value: color.colorId,
      label: color.value,
    })) || [];

  const handleAddToCart = async (product) => {
    const newErrors = {};
    if (selectedSize.length == 0 || selectedColor.length == 0) {
      newErrors.null = "You Should Choose Color and Size";
      setErrors(newErrors);
    } else {
      const size = await getSingleSize(selectedSize, token);
      const color = await getSingleColor(selectedColor, token);
      const productToCart = {
        image: product.image,
        title: product.title,
        productId: product.productId,
        material: product.material,
        size: size.value,
        color: color.value,
        price: product.price,
      };
      addProductToCart(productToCart);
      navigate("/products");
    }
  };

  const handleSizeChange = (event) => {
    setSelectedSize(event.target.value);
  };

  const handleColorChange = (event) => {
    setSelectedColor(event.target.value);
  };

  if (isLoading) {
    return <p>Product is Loading...</p>;
  }

  if (error) {
    return <p>{error.message}</p>;
  }

  if (!product) {
    return <p>Product is not available.</p>;
  }

  const { image, title, price, material } = product;

  return (
    <Container className="productDetailsContainer">
      <PageTitle title="Product Details" />
      <Card className="productDetailsCard">
        <img className="productDetailsImage" src={image} alt={title} />
        <Card.Body className="productDetailsInfo">
          <h3 className="productDetailsTitle">{title}</h3>
          <Material material={material} />
          <ProductSelect
            htmlFor={product.productId}
            label="Size"
            required={true}
            value={selectedSize}
            onChange={handleSizeChange}
            options={sizeOptions}
          />
          <ProductSelect
            htmlFor={product.productId}
            label="Color"
            required={true}
            value={selectedColor}
            onChange={handleColorChange}
            options={colorOptions}
          />
          {errors && <p className="errors">{errors.null}</p>}
          <h4 className="productDetailsPrice">Price: {price} SAR</h4>
          <Button className="cart-btn" onClick={() => handleAddToCart(product)}>
            Add To Cart
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default ProductDetails;
