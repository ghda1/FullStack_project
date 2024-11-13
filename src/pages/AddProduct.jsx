import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";


import uploadImageToCloudinary from "../utility/UploadImageToCloudinary";
import { UserContext } from "../contexts/UserContext";
import FormButton from "../components/form/FormButton";
import { SizeContext } from "../contexts/SizeContext";
import { ColorContext } from "../contexts/ColorContext";
import { addProductFields } from "../components/products/addProductFields";
import FormGroup from "../components/form/FormGroup";
import FormSelectGroup from "../components/form/FormSelectGroup";
import PageTitle from "../components/PageTitle";
import { addProduct, getAllProducts } from "../services/productService";

export default function AddProduct() {
  const initialValue = {
    image: "",
    title: "",
    sizeIds: [],
    colorIds: [],
    material: "",
    quantity: 0,
    price: 0.0,
  };

  const { token } = useContext(UserContext);
  const { sizes } = useContext(SizeContext);
  const { colors } = useContext(ColorContext);
  const [product, setProduct] = useState(initialValue);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const sizeOptions = sizes.map((size) => ({
    value: size.sizeId,
    label: size.value,
  }));

  const colorOptions = colors.map((color) => ({
    value: color.colorId,
    label: color.value,
  }));

  const handleChange = (event) => {
    setProduct((prevState) => {
      return { ...prevState, [event.target.name]: event.target.value };
    });
  };

  const handleImageChange = (event) => {
    setProduct((prevState) => {
      return { ...prevState, [event.target.name]: event.target.files[0] };
    });
  };
  const handleSizeChange = (event) => {
    setSelectedSizes(event.target.value);
  };
  const handleColorChange = (event) => {
    setSelectedColors(event.target.value);
  };
  const handelAddProduct = async (newProduct, token) => {
    await addProduct(newProduct, token);
    const productData = await getAllProducts();
    setProduct(productData);
  };

  const isValidateForm = () => {
    const newErrors = {};
    if (!product.title.trim()) newErrors.title = "Title is required";
    if (product.title.length < 3)
      newErrors.title = "Title should be at least 3 characters long";
    if (!product.material) newErrors.material = "Material is required";
    if (product.material.length < 3)
      newErrors.material = "Material should be at least 3 characters long";
    if (!product.quantity) newErrors.quantity = "Quantity is required";
    if (product.quantity <= 0)
      newErrors.quantity = "Quantity should be more than 0";
    if (!product.price) newErrors.price = "Price is required";
    if (product.price <= 0) newErrors.price = "Price should be more than 0";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const restValues = () => {
    setProduct(initialValue);
    setErrors({});
  };
  const submitHandler = async (event) => {
    event.preventDefault();

    if (isValidateForm()) {
      let imageUrl = await uploadImageToCloudinary(product.image);
      const newProduct = {
        image: imageUrl,
        title: product.title,
        sizeIds: selectedSizes,
        colorIds: selectedColors,
        material: product.material,
        quantity: product.quantity,
        Price: product.price,
      };
      await handelAddProduct(newProduct, token);
      restValues();
      navigate("/dashboard");
    }
  };
  return (
    <div className="addProductForm">
      <PageTitle title="Add Product" />
      <h2 className="addProductTitle">Add New Product</h2>
      <form className="form" onSubmit={submitHandler}>
        <p className="warning">Make sure that the image is unique</p>
        {addProductFields.map((field) => {
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
              error={product[field.name]}
            />
          ) : (
            <FormGroup
              key={field.id}
              id={field.id}
              label={field.lable}
              name={field.name}
              type={field.type}
              value={product[field.name]}
              onChange={
                field.name === "image" ? handleImageChange : handleChange
              }
              required={field.required}
              error={errors[field.name]}
            />
          );
        })}
        <FormButton type="submit">Add</FormButton>
      </form>
    </div>
  );
}
