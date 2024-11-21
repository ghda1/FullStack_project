import React, { useContext } from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
  MDBIcon,
  MDBInput,
  MDBTypography,
} from "mdb-react-ui-kit";
import { CartContext } from "../contexts/CartContext";
import PageTitle from "../components/PageTitle";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

const Cart = () => {
  const { productCart, removeProductFromCart, updateProductQuantity } =
    useContext(CartContext);

  const { isLogIn } = useContext(UserContext);

  const navigate = useNavigate();

  const totalPrice = productCart.reduce((total, product) => {
    return total + product.price * product.quantity;
  }, 0);

  const handlePlusQuantity = (product) => {
    updateProductQuantity(product.productId, product.quantity + 1);
  };

  const handleMinusQuantity = (product) => {
    if (product.quantity > 1) {
      updateProductQuantity(product.productId, product.quantity - 1);
    }
  };

  const handleInputQuantityChange = (e, product) => {
    const newQuantity = parseInt(e.target.value, 10);
    updateProductQuantity(
      product.productId,
      isNaN(newQuantity) ? 1 : newQuantity
    );
  };

  const handlePaymentClick = () => {
    if (isLogIn) {
      navigate("/");
    } else {
      navigate("/login");
    }
  };

  return (
    <section className="h-100" style={{ backgroundColor: "#eee" }}>
      <MDBContainer className="py-5 h-100">
        <PageTitle title="Cart" />
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol md="10">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <MDBTypography tag="h3" className="fw-normal mb-0 text-black">
                {productCart.length > 0
                  ? "Shopping Cart"
                  : "Your cart is empty"}
              </MDBTypography>
            </div>
            {productCart.map((product) => (
              <MDBCard key={product.productId} className="rounded-3 mb-4">
                <MDBCardBody className="p-4">
                  <MDBRow className="justify-content-between align-items-center">
                    <MDBCol md="2" lg="2" xl="2">
                      <MDBCardImage
                        className="rounded-3"
                        fluid
                        src={product.image}
                        alt={product.title}
                      />
                    </MDBCol>
                    <MDBCol md="3" lg="3" xl="3">
                      <p className="lead fw-normal mb-2">{product.title}</p>
                      <p>
                        <span className="text-muted">Size: {product.size}</span>
                      </p>
                      <p>
                        <span className="text-muted">
                          Color: {product.color}
                        </span>
                      </p>
                    </MDBCol>
                    <MDBCol
                      md="3"
                      lg="3"
                      xl="2"
                      className="d-flex align-items-center justify-content-around"
                    >
                      <MDBBtn
                        color="link"
                        className="fixed-button px-2"
                        onClick={() => handleMinusQuantity(product)}
                      >
                        <MDBIcon fas icon="minus" />
                      </MDBBtn>

                      <MDBInput
                        min={1}
                        value={product.quantity}
                        type="number"
                        size="sm"
                        className="text-center"
                        onChange={(e) => handleInputQuantityChange(e, product)}
                      />

                      <MDBBtn
                        color="link"
                        className="fixed-button px-2"
                        onClick={() => handlePlusQuantity(product)}
                      >
                        <MDBIcon fas icon="plus" />
                      </MDBBtn>
                    </MDBCol>
                    <MDBCol md="3" lg="2" xl="2" className="offset-lg-1">
                      <MDBTypography tag="h5" className="mb-0">
                        {product.price} SAR
                      </MDBTypography>
                    </MDBCol>
                    <MDBCol md="1" lg="1" xl="1" className="text-end">
                      <MDBBtn
                        color="link"
                        className="fixed-button px-2"
                        onClick={() => removeProductFromCart(product.productId)}
                      >
                        <MDBIcon fas icon="trash text-danger" size="lg" />
                      </MDBBtn>
                    </MDBCol>
                  </MDBRow>
                </MDBCardBody>
              </MDBCard>
            ))}
            <MDBTypography tag="h3" className="fw-normal mb-0 text-black">
              {productCart.length > 0 ? `Total Price: ${totalPrice}` : ""}
            </MDBTypography>
            {productCart.length > 0 ? (
              <button
                className="payment-btn"
                onClick={() => handlePaymentClick()}
              >
                Complate to Payment
              </button>
            ) : (
              ""
            )}
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
};

export default Cart;
