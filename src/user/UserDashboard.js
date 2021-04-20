import React from 'react'
import Layout from './../core/Layout';
import { isAuthenticated } from '../auth';
import { Link } from 'react-router-dom'
const UserDashboard = () => {
    const { user: { _id, name, email, role } } = isAuthenticated()

    const userLinks = () => {
        return (
            <div className="card">
                <h4 className="card-header">User links</h4>
                <ul className="list-group">
                    <li className="list-group-item">
                        <Link class="nav-link" to="/cart">My cart</Link>
                    </li>
                    <li className="list-group-item">
                        <Link class="nav-link" to="/profile/update">Update Profile</Link>
                    </li>
                </ul>
            </div>
        )
    }
    const userInfo = () => {
        return (
            <div className="card mb-5">
                <h3 className="card-header">User Information</h3>
                <ul className="list-group">
                    <li className="list-group-item">
                        {name}
                    </li>
                    <li className="list-group-item">
                        {email}
                    </li>
                    <li className="list-group-item">
                        {role === 1 ? 'Admin' : 'Register user'}
                    </li>
                </ul>
            </div>
        )
    }
    const purchaseHistory = () => {
        return (
            <div className="card mb-5">
                <h3 className="card-header">Purschase history</h3>
                <ul className="list-group">
                    <li className="list-group-item">
                        Name
                        </li>
                    <li className="list-group-item">
                        Email
                        </li>
                    <li className="list-group-item">
                        Role
                        </li>
                </ul>
            </div>
        )
    }
    return (
        <div>
            <Layout title="User Dashboard" description={`Good day ${name}`}>
                <div className="row">
                    <div className="col-3">
                        {userLinks()}
                    </div>
                    <div className="col-9">
                        {userInfo()}
                        {purchaseHistory()}
                    </div>
                </div>
            </Layout>
        </div>
    )
}

export default UserDashboard
