import React, { useContext } from "react";
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBInput,
  MDBRow,
  MDBTypography,
} from "mdb-react-ui-kit";

import { CartContext } from "../contexts/CartContext";
import PageTitle from "../components/PageTitle";

function Cart() {
  const { productCart, updateProductQuantity, removeProductFromCart } =
    useContext(CartContext);

  const handlePlusQuantity = (product) => {
    let quantity = product.quantity + 1;
    updateProductQuantity(product.productId, quantity);
  };

  const handleMinusQuantity = (product) => {
    let quantity = product.quantity - 1;
    updateProductQuantity(product.productId, quantity);
  };

  const handleRemoveProduct = (product) => {
    removeProductFromCart(product.productId);
  };

  return (
    <section className="h-100" style={{ backgroundColor: "#eee" }}>
      <PageTitle title="Cart" />
      <MDBContainer className="py-5 h-100">
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol md="10">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <MDBTypography tag="h3" className="fw-normal mb-0 text-black">
                {productCart && productCart.length > 0
                  ? "Shopping Cart"
                  : "Your cart is empty"}
              </MDBTypography>
            </div>
            {productCart &&
              productCart.map((product) => {
                return (
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
                            <span className="text-muted">
                              Size: {product.size}
                            </span>
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
                            className="px-2"
                            onClick={() => handleMinusQuantity(product)}
                          >
                            <MDBIcon fas icon="minus" />
                          </MDBBtn>

                          <MDBInput
                            min={0}
                            value={product.quantity}
                            type="text"
                            size="sm"
                            readOnly
                            className="text-center"
                          />

                          <MDBBtn
                            color="link"
                            className="px-2"
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
                            className="px-2"
                            onClick={() => handleRemoveProduct(product)}
                          >
                            <MDBIcon fas icon="trash text-danger" size="lg" />
                          </MDBBtn>
                        </MDBCol>
                      </MDBRow>
                    </MDBCardBody>
                  </MDBCard>
                );
              })}
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
}

export default Cart;
