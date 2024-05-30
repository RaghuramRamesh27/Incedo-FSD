import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './LoginPage.css';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8080/auth/login', {
                email,
                password,
            });

            if (response.data === "Login successful") {
                const roleResponse = await axios.post('http://localhost:8080/auth/getRole', { email });
                const userRole = roleResponse.data;


                if (userRole === "User") {
                    navigate('/userPage');
                    sessionStorage.setItem('isUserLoggedIn', 'true');
                    sessionStorage.setItem('userRole', userRole);
                    sessionStorage.setItem('userEmail', email);

                } else if (userRole === "Admin") {
                    navigate('/adminPage');
                    sessionStorage.setItem('isAdminLoggedIn', 'true');
                    sessionStorage.setItem('adminEmail', email);


                } else {
                    setErrorMessage("Unexpected role received");
                }
            } else {
                setErrorMessage("Invalid login details");
            }
        } catch (error) {
            console.error('Error occurred:', error);
            setErrorMessage("An error occurred during login");
        }
    };

    return (
        <div className="register-container">
            <h2 style={{ color: 'black' }}>Login</h2>
            <div className="login-page">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input 
                            type="email" 
                            id="email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            required 
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input 
                            type="password" 
                            id="password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            required 
                        />
                    </div>
                    <button type="submit">Login</button>
                </form>
                <br />
                <br />
                {errorMessage && <div className='errorMessageLogin'> {errorMessage} </div>}
                <p>Don't have an account? <Link to="/register">Register</Link></p>
            </div>
        </div>
    );
};

export default LoginPage;
