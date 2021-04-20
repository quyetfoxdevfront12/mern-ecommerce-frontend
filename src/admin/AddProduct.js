import React, { useEffect, useState } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { Link } from 'react-router-dom';
import { createProduct } from './apiAdmin';

const AddProduct = () => {
    const [values, setValues] = useState({
        name: "",
        description: "",
        price: 0,
        categories: [],
        category: "",
        shipping: false,
        photo: "",
        loading: false,
        error: false,
        success: false,
        quantity: 0,
        createdProduct: "",
        redirectToProfile: false,
        formData: ""
    });

    // destructoring user và token từ localStorage
    const { user, token } = isAuthenticated();
    const {
        name,
        description,
        price,
        categories: [],
        category,
        shipping,
        photo,
        loading,
        error,
        success,
        quantity,
        createdProduct,
        redirectToProfile,
        formData
    } = values;

    useEffect(() => {
        setValues({ ...values, formData: new FormData() })
    }, [])
    const handleChange = name => e => {
        const value = name === 'photo' ? e.target.files[0] : e.target.value;
        formData.set(name, value);
        setValues({ ...values, [name]: value })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        setValues({ ...values, loading: true });
        // // call api
        createProduct(user._id, token, formData)
            .then(data => {
                if (data.error) {
                    setValues({ ...values, error: true, success: false })
                } else {
                    setValues({
                        ...values,
                        name: "",
                        description: "",
                        photo: "",
                        price: "",
                        quantity: "",
                        loading: false,
                        error: false,
                        success: true,
                        createProduct: data.name
                    })
                }
            })
        console.log(values);
    }
    const productForm = () => {
        return (
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="" className="text-muted">Tên sản phẩm</label>
                    <input type="text"
                        className="form-control"
                        onChange={handleChange("name")}
                        value={name}
                        required
                        autoFocus
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="" className="text-muted">Giá sản phẩm</label>
                    <input type="number"
                        className="form-control"
                        onChange={handleChange("price")}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="" className="text-muted">Mô tả sản phẩm</label>
                    <textarea type="text"
                        className="form-control"
                        onChange={handleChange("description")}
                        required
                    ></textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="" className="text-muted">Ảnh sản phẩm</label>
                    <input type="file"
                        className="form-control"
                        onChange={handleChange("photo")}
                        accept="image/*"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="" className="text-muted">Danh mục sản phẩm</label>
                    <select
                        className="form-control"
                        onChange={handleChange("category")}
                    >
                        <option value="607cf16a825e65dc5327bffa">React native</option>
                        <option value="607cf16a825e65dc5327bffa">React native</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="" className="text-muted">Số lượng sản phẩm</label>
                    <input type="text"
                        className="form-control"
                        onChange={handleChange("quantity")}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="" className="text-muted">Shipping</label>
                    <select
                        className="form-control"
                        onChange={handleChange("shipping")}
                    >
                        <option value="0">True</option>
                        <option value="1">False</option>
                    </select>
                </div>
                <button className="btn btn-outline-primary">Tạo sản phẩm</button>
            </form>
        )
    }
    const showSuccess = () => {
        if (success) {
            return <h3 className="text-success">Sản phẩm "{name}" được tạo thành công</h3>
        }
    }
    const showError = () => {
        if (error) {
            return <h3 className="text-danger">Tên danh mục {name} bị trùng. </h3>
        }
    }
    const goBack = () => {
        return <Link to="/admin/dashboard" className="d-block mt-5 text-warning">Trở lại quản lý</Link>
    }
    return (
        <Layout title="Add a new product"
            description={`Good day ${user.name}, sẵn sàng để tạo mới một danh mục`}
        >
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    {showError()}
                    {showSuccess()}
                    {productForm()}
                    {goBack()}
                </div>
            </div>
        </Layout >
    )
}

export default AddProduct
