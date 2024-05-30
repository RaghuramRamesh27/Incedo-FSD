import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './UserPage.css';
import axios from 'axios';

const UserPage = () => {
    const navigate = useNavigate();
    const [userEmail, setUserEmail] = useState('');
    const [isUserLoggedInx, setIsUserLoggedInx] = useState('');

    useEffect(() => {
        const email = sessionStorage.getItem('userEmail');
        const isUserLoggedInxTemp = sessionStorage.getItem('isUserLoggedIn');
        
        if (isUserLoggedInxTemp) {
            setUserEmail(email)//;
            setIsUserLoggedInx('true')
        } 
        else{
            navigate('/login')
        }
    }, [navigate]);

    const handleLogout = async () => {
        try {
            const response = await axios.post('http://localhost:8080/auth/logout', { email: userEmail });
            console.log(response.data)
            if (response.data==="Logout successful") {
             
                sessionStorage.removeItem('isUserLoggedIn');
                sessionStorage.removeItem('userEmail');
                
                navigate('/login');
            } else {
                console.error('Logout failed:', await response.data);
            }
        } catch (error) {
            console.error('An error occurred during logout:', error);
        }
    };

    return (
        <div>
            <h1 style={{ fontSize: '1.2rem' , color:'black'}}>Welcome, {userEmail}</h1>
            <h2>Educational Resources</h2>
            <div className="user-container">
    <div className="card">
        <h2>javascript</h2>
        <p>JS: <a href="https://developer.mozilla.org/en-US/docs/Web/javascript">https://developer.mozilla.org/en-US/docs/Web/javascript</a></p>
       
    </div>
    <div className="card">
        <h2>React JS</h2>
        <p>Reactjs: <a href="https://legacy.reactjs.org/tutorial/tutorial.html">https://legacy.reactjs.org/tutorial/tutorial.html</a></p>      
    </div>
    <div className="card">
        <h2>Angular JS</h2>
        <p>Angular JS: <a href="https://docs.angularjs.org/guide">https://docs.angularjs.org/guide</a></p>

    </div>
    <div className="card">
        <h2>Core Java</h2>
        <p>oracle: <a href="https://docs.oracle.com/en/java/">https://docs.oracle.com/en/java/</a></p>
    </div>
    <div className="card">
        <h2>Spring Boot</h2>
        <p>Spring :<a href="https://docs.spring.io/spring-framework/reference/index.html">https://docs.spring.io/spring-framework/reference/index.html</a></p>
    </div>
    <div className="card">
        <h2>Dot NET</h2>
        <p>.Net: <a href="https://learn.microsoft.com/en-us/dotnet/">https://learn.microsoft.com/en-us/dotnet/</a></p>
    </div>
    <div className="card">
        <h2>Node JS</h2>
        <p>Node :<a href="https://nodejs.org/docs/latest/api/">https://nodejs.org/docs/latest/api/</a></p>
    </div>
    <div className="card">
        <h2>Github</h2>
        <p>Github: <a href="https://github.com/">https://github.com/</a></p>
    </div>
</div>

            <div className="button-container">
                <button onClick={handleLogout} style={{ fontSize: '12px', padding: '6px 12px' }}>Logout</button>
            </div>
        </div>
    );
};

export default UserPage;
