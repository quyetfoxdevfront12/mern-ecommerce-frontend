import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import Layout from '../core/Layout';
import { signup } from './../auth'
const Signup = () => {
    const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",
        error: "",
        success: false
    });
    const { name, email, password, error, success } = values;
    const handleChange = name => event => {
        setValues({
            ...values,
            error: false,
            [name]: event.target.value
        })
    }

    const clickSubmit = (e) => {
        e.preventDefault();
        signup({ name, email, password })
            .then(data => {
                if (data.error) {
                    setValues({ ...values, error: data.error, success: false })
                } else {
                    setValues({
                        ...values,
                        name: '',
                        password: '',
                        email: '',
                        error: '',
                        success: true
                    })
                }
            })
    }
    const showError = () => (
        <div className="alert alert-danger" style={{ display: error ? "" : "none" }}>
            {error}
        </div>
    )
    const showSuccess = () => (
        <div className="alert alert-info" style={{ display: success ? "block" : "none" }}>
            New account is created. Please <Link to="/signin">signin</Link>
        </div>
    )
    const signUpForm = () => (
        <form className="w-50 mx-auto">
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input type="text" className="form-control" onChange={handleChange('name')} />
            </div>
            <div className="form-group">
                <label className="text-muted">Email</label>
                <input type="email" className="form-control" onChange={handleChange('email')} />
            </div>
            <div className="form-group">
                <label className="text-muted">Password</label>
                <input type="password" className="form-control" onChange={handleChange('password')} />
            </div>
            <button onClick={clickSubmit} className="btn btn-primary">Add</button>
        </form>
    )

    return (
        <>
            <Layout title="Sign up" description="Sign up to Node React Ecommerce app">
                {showError()}
                {showSuccess()}
                {signUpForm()}
                {JSON.stringify(values)}
            </Layout>
        </>
    )
}

export default Signup
