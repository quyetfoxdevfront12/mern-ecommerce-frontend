import React from 'react';
import { Link, NavLink, useHistory } from 'react-router-dom';
import { signout, isAuthenticated } from '../auth';

const Header = () => {
    let history = useHistory();
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <NavLink className="navbar-brand" to="/">Navbar</NavLink>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/" activeClassName="active">Home</NavLink>
                        </li>

                        {isAuthenticated() && isAuthenticated().user.role === 0 && (
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/user/dashboard" activeClassName="active">Dashboard</NavLink>
                            </li>
                        )}

                        {isAuthenticated() && isAuthenticated().user.role === 1 && (
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/admin/dashboard" activeClassName="active">Dashboard</NavLink>
                            </li>
                        )}
                        {!isAuthenticated() && (
                            <>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/signin" activeClassName="active">Signin</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/signup" activeClassName="active">Signup</NavLink>
                                </li>
                            </>
                        )}
                        {isAuthenticated() && (
                            <>
                                <li className="nav-item">
                                    <a className="nav-link" onClick={() => signout(() => {
                                        history.push('/')
                                    })}>Sign out</a>
                                </li>
                            </>
                        )}

                    </ul>

                </div>
            </div>
        </nav>
    )
}

export default Header
