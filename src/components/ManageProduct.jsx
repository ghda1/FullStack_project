import React, { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ProductContext } from "../contexts/ProductContext";
import { deleteProduct } from "../services/ProductService";

function ManageProducts() {
  const { products, isLoading, error, token } = useContext(ProductContext);

  const navigate = useNavigate();

  const handleDelteProduct = async (userId, token) => {
    await deleteProduct(userId, token);
  };

  const handleUpdateProduct = (product) => {
    navigate("/updateProduct", { state: product });
  };

  const handleAddProduct = () => {
    navigate("/addProduct");
  };

  if (isLoading) {
    return <h2>Users are Loading...</h2>;
  }

  if (error) {
    return <h2>{error.message}</h2>;
  }

  if (!products) {
    return <h2>There is no products</h2>;
  }

  return (
    <div>
      <h3>Manage Products</h3>
      <Table responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Product ID</th>
            <th>Image</th>
            <th>Title</th>
            <th>Material</th>
            <th>Colors</th>
            <th>Sizes</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => {
            const {
              productId,
              image,
              title,
              price,
              material,
              colors,
              sizes,
              quantity,
            } = product;
            return (
              <tr key={productId}>
                <td>{++index}</td>
                <td>{productId}</td>
                <td>
                  <img src={image} title={title}></img>
                </td>
                <td>{title}</td>
                <td>{material}</td>
                <td>
                  {colors.map((color, index) => (
                    <span key={index}>
                      {color.value}
                      <br />
                    </span>
                  ))}
                </td>
                <td>
                  {sizes.map((size, index) => (
                    <span key={index}>
                      {size.value}
                      <br />
                    </span>
                  ))}
                </td>

                <td>{quantity}</td>
                <td>{price}</td>
                <td>
                  <button onClick={() => handleUpdateProduct(product)}>
                    Edit
                  </button>
                </td>
                <td>
                  <button onClick={() => handleDelteProduct(productId, token)}>
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
          <td>
            <button
              className="add-product-btn"
              onClick={() => handleAddProduct()}
            >
              Add New Product
            </button>
          </td>
        </tbody>
      </Table>
    </div>
  );
}

export default ManageProducts;
