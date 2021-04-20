import React, { useState } from 'react'
import { Redirect } from 'react-router-dom';
import Layout from '../core/Layout';
import { signin, authenticate, isAuthenticated } from './../auth'
const Signin = () => {
    const [values, setValues] = useState({
        email: "",
        password: "",
        error: "",
        loading: false,
        redirectToReferrer: false
    });
    const { email, password, error, redirectToReferrer, loading } = values;
    const { user } = isAuthenticated();

    const handleChange = name => event => {
        setValues({
            ...values,
            error: false,
            [name]: event.target.value
        })
    }

    const clickSubmit = (e) => {
        e.preventDefault();
        setValues({ ...values, error: false, loading: true })
        signin({ email, password })
            .then(data => {
                console.log(data)
                if (data.error) {
                    setValues({ ...values, error: data.error, success: false })
                } else {
                    authenticate(data, () => {
                        setValues({
                            ...values,
                            redirectToReferrer: true
                        })
                    })
                }
            })
    }
    const showError = () => (
        <div className="alert alert-danger" style={{ display: error ? "" : "none" }}>
            {error}
        </div>
    )
    const showLoading = () => (
        loading && (
            <div className="alert alert-info">
                <h2>...loading</h2>
            </div>
        )
    );
    const redirectUser = () => {
        if (redirectToReferrer) {
            if (user && user.role === 1) {
                return <Redirect to="/admin/dashboard" />
            } else {
                return <Redirect to="/user/dashboard" />
            }
        }
        if (isAuthenticated()) {
            return <Redirect to="/" />
        }
    }
    const signinForm = () => (
        <form className="w-50 mx-auto">
            <div className="form-group">
                <label className="text-muted">Email</label>
                <input type="email" className="form-control" onChange={handleChange('email')} />
            </div>
            <div className="form-group">
                <label className="text-muted">Password</label>
                <input type="password" className="form-control" onChange={handleChange('password')} />
            </div>
            <button onClick={clickSubmit} className="btn btn-primary">Login</button>
        </form>
    )

    return (
        <>
            <Layout title="Sign In" description="Signin to Node React Ecommerce app">
                {showError()}
                {showLoading()}
                {signinForm()}
                {redirectUser()}
            </Layout>
        </>
    )
}

export default Signin
