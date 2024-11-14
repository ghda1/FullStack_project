import React, { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import FormGroup from "../components/form/FormGroup";
import FormButton from "../components/form/FormButton";

import { SizeContext } from "../contexts/SizeContext";
import { ColorContext } from "../contexts/ColorContext";
import { updateProductFields } from "../components/products/updateProductFields";
import FormSelectGroup from "../components/form/FormSelectGroup";
import { UserContext } from "../contexts/UserContext";
import { ProductContext } from "../contexts/ProductContext";
import uploadImageToCloudinary from "../utility/uploadImageToCloudinary";
import PageTitle from "../components/PageTitle";
import { getAllProducts, updateProduct } from "../services/productService";

function UpdateProfile() {
  const locationState = useLocation();
  const [updateProductData, setUpdateProductData] = useState(
    locationState.state
  );
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const {
    productId,
    image,
    title,
    sizes: sizeProduct,
    colors: colorProduct,
    material,
    quantity,
    price,
  } = updateProductData;
  const sizeIds = sizeProduct.map((size) => size.sizeId);
  const colorIds = colorProduct.map((color) => color.colorId);

  const [selectedSizes, setSelectedSizes] = useState(sizeIds);
  const [selectedColors, setSelectedColors] = useState(colorIds);
  const { token } = useContext(UserContext);
  const { sizes } = useContext(SizeContext);
  const { colors } = useContext(ColorContext);
  const { setProducts } = useContext(ProductContext);

  const sizeOptions = sizes.map((size) => ({
    value: size.sizeId,
    label: size.value,
  }));

  const colorOptions = colors.map((color) => ({
    value: color.colorId,
    label: color.value,
  }));
  const handleChange = (event) => {
    setUpdateProductData((prevState) => {
      return { ...prevState, [event.target.name]: event.target.value };
    });
  };

  const handleImageChange = (event) => {
    setUpdateProductData((prevState) => {
      return { ...prevState, [event.target.name]: event.target.files[0] };
    });
  };
  const handleSizeChange = (event) => {
    setSelectedSizes(event.target.value);
  };
  const handleColorChange = (event) => {
    setSelectedColors(event.target.value);
  };

  const handleUpdateProductData = async (productId, ProductData, token) => {
    await updateProduct(productId, ProductData, token);
    const res = await getAllProducts();
    const productsData = res.items;
    setProducts(productsData);
  };

  const isValidateForm = () => {
    const newErrors = {};
    if (title.length < 3)
      newErrors.title = "Title should be at least 3 characters long";
    if (material.length < 3)
      newErrors.material = "Material should be at least 3 characters long";
    if (quantity <= 0) newErrors.quantity = "Quantity should be more than 0";
    if (price <= 0) newErrors.price = "Price should be more than 0";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const restValues = () => {
    setUpdateProductData({
      image: "",
      title: "",
      sizeId: [],
      colorId: [],
      material: "",
      quantity: 0,
      price: 0.0,
    });
    setErrors({});
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    if (isValidateForm()) {
      const imageUrl = await uploadImageToCloudinary(image);
      const ProductData = {
        image: imageUrl ?? image,
        title: title,
        sizeIds: selectedSizes,
        colorIds: selectedColors,
        material: material,
        quantity: quantity,
        price: price,
      };
      handleUpdateProductData(productId, ProductData, token);
      restValues();
      navigate("/dashboard");
    }
  };

  return (
    <div className="updateForm">
      <PageTitle title="Update Product" />
      <h2 className="updateTitle">Update Profile</h2>
      <form className="form" onSubmit={submitHandler}>
        <img className="updateImage" src={image} alt={title} />
        <p className="warning">Make sure that the image is unique</p>
        {updateProductFields.map((field) => {
          return field.type === "select" ? (
            <FormSelectGroup
              key={field.id}
              id={field.id}
              lable={field.lable}
              required={field.required}
              value={field.name === "size" ? selectedSizes : selectedColors}
              onChange={
                field.name === "size" ? handleSizeChange : handleColorChange
              }
              options={field.name === "size" ? sizeOptions : colorOptions}
              error={updateProductData[field.name]}
            />
          ) : (
            <FormGroup
              key={field.id}
              id={field.id}
              label={field.lable}
              name={field.name}
              type={field.type}
              value={updateProductData[field.name]}
              onChange={
                field.name === "image" ? handleImageChange : handleChange
              }
              required={field.required}
              error={errors[field.name]}
            />
          );
        })}
        <FormButton type="submit">Update</FormButton>
      </form>
    </div>
  );
}

export default UpdateProfile;
