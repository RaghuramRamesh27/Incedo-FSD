import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; 
import './RegisterPage.css';

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('User');
  const [registrationSuccess, setRegistrationSuccess] = useState(false); 
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make a POST request to the backend
      const response = await axios.post('http://localhost:8080/auth/register', {
        email: email,
        password: password,
        role: role
      });

      
      console.log(response.data); 
      setRegistrationSuccess(true); 
    } catch (error) {
      console.error('Error registering user:', error);
     
    }
  };

  return (
    <div className="register-container">
      <h2 style={{ color: 'black' }}>Register</h2>
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
        <div className="form-group">
          <label htmlFor="role">Role:</label>
          <select
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="User">User</option>
            <option value="Admin">Admin</option>
          </select>
        </div>
        <button type="submit" className="register-button">Register</button>
      </form>
      {registrationSuccess && <p style={{ color: 'green' }}>Registration successful</p>}
      <br></br>
      <br></br>
      <p>Already have an account? <Link to="/login">Login</Link></p>
    </div>
  );
};

export default RegisterPage;
