import React, { useState } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { Link } from 'react-router-dom';
import { createCategory } from './apiAdmin';

const AddCategory = () => {
    const [name, setName] = useState('');
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    // destructoring user và token từ localStorage
    const { user, token } = isAuthenticated();
    const handleChange = (e) => {
        setError('');
        setName(e.target.value)
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        // call api
        createCategory(user._id, token, { name })
            .then(data => {
                if (data.error) {
                    setError(true)
                } else {
                    setError(false);
                    setSuccess(true)
                }
            })

    }
    const newCategoryForm = () => {
        return (
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="" className="text-muted">Tên danh mục</label>
                    <input type="text"
                        className="form-control"
                        onChange={handleChange}
                        value={name}
                        required
                        autoFocus
                    />
                </div>
                <button className="btn btn-outline-primary">Tạo Danh mục</button>
            </form>
        )
    }
    const showSuccess = () => {
        if (success) {
            return <h3 className="text-success">Danh mục "{name}" được tạo thành công</h3>
        }
    }
    const showError = () => {
        if (error) {
            return <h3 className="text-danger">Tên danh mục {name} bị trùng. </h3>
        }
    }
    const goBack = () => {
        return <Link to="/admin/dashboard" class="d-block mt-5 text-warning">Trở lại quản lý</Link>
    }
    return (
        <Layout title="Add a new category"
            description={`Good day ${user.name}, sẵn sàng để tạo mới một danh mục`}
        >
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    {showError()}
                    {showSuccess()}
                    {newCategoryForm()}
                    {goBack()}
                </div>
            </div>
        </Layout >
    )
}

export default AddCategory
