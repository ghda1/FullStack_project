import { useContext } from "react";
import { Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import { ProductContext } from "../contexts/ProductContext";
import PaginationComponent from "./PaginationComponent";
import SortSelect from "./SortSelect";
import SearchInput from "./SearchInput";
import { deleteProduct, getAllProducts } from "../services/productService";

function ManageProducts() {
  const {
    setProducts,
    products,
    isLoading,
    error,
    token,
    pageNumber,
    setPagaeNumber,
    totalPages,
    setSearchQuery,
    setSortBy,
    setSortOrder,
  } = useContext(ProductContext);

  const navigate = useNavigate();

  const handleDelteProduct = async (productId, token) => {
    await deleteProduct(productId, token);
    const res = await getAllProducts();
    const productsData = res.items;
    setProducts(productsData);
  };

  const handleUpdateProduct = (product) => {
    navigate("/updateProduct", { state: product });
  };

  const handleAddProduct = () => {
    navigate("/addProduct");
  };

  if (isLoading) {
    return <h2>Products are Loading...</h2>;
  }

  if (error) {
    return <h2>{error.message}</h2>;
  }

  return (
    <div className="dashboard-content">
      <h3>Manage Products</h3>
      <div className="search-sort">
        <SearchInput setSearchQuery={setSearchQuery} />
        <SortSelect setSortBy={setSortBy} setSortOrder={setSortOrder} />
      </div>
      <button className="add-product-btn" onClick={() => handleAddProduct()}>
        Add New Product
      </button>
      {products && products ? (
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
                  <td>{price} SAR</td>
                  <td>
                    <button onClick={() => handleUpdateProduct(product)}>
                      Edit
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={() => handleDelteProduct(productId, token)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      ) : (
        <h2>There is no products</h2>
      )}
      <PaginationComponent
        pageNumber={pageNumber}
        setPagaeNumber={setPagaeNumber}
        totalPages={totalPages}
      />
    </div>
  );
}

export default ManageProducts;
