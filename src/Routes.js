import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './core/Header';
import Home from './core/Home';

import Signin from './user/Signin'
import Signup from './user/Signup';
import PrivateRoute from './auth/PrivateRoute';
import AdminRoute from './auth/AdminRoute';
import Dashboard from './user/UserDashboard';
import AdminDashboard from './user/AdminDashboard';
import AddCategory from './admin/AddCategory';
import AddProduct from './admin/AddProduct';
const Routers = () => {
    return (
        <Router>
            <Header />
            <Switch>
                <Route path="/" exact component={() => {
                    return <Home />
                }} />
                <Route path="/signin" exact component={() => {
                    return <Signin />
                }} />
                <Route path="/signup" exact component={() => {
                    return <Signup />
                }} />

                <PrivateRoute exact path="/user/dashboard">
                    <Dashboard />
                </PrivateRoute>
                <AdminRoute exact path="/admin/dashboard">
                    <AdminDashboard />
                </AdminRoute>
                <AdminRoute exact path="/create/category">
                    <AddCategory />
                </AdminRoute>
                <AdminRoute exact path="/create/product">
                    <AddProduct />
                </AdminRoute>
            </Switch>
        </Router>
    )
}
export default Routers;
