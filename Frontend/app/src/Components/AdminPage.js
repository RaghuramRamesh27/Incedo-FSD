import React, { useEffect, useState } from 'react';
import './AdminPage.css'; // Ensure this file exists and is properly linked
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminPage = () => {
  const [sessions, setSessions] = useState([]);
  const [filteredSessions, setFilteredSessions] = useState([]); 
  const [errorMessage, setErrorMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState(''); 
  const [adminEmailLocal, setAdminEmail] = useState('');
  const [isAdminLoggedInx, setIsAdminLoggedInx] = useState('');
  const navigate = useNavigate();

  useEffect(() => {

    const checkAdminSession = () => {
      const email = sessionStorage.getItem('adminEmail');
      const isAdminLoggedInTemp = sessionStorage.getItem('isAdminLoggedIn');
      
      if (isAdminLoggedInTemp) {
        setAdminEmail(email);
      } else {
        navigate('/login');
      }
    };


    const fetchSessions = async () => {

      try {
        const response = await axios.get('http://localhost:8080/auth/sessions');
        console.log(response.data);
        setSessions(response.data);
        setFilteredSessions(response.data); 
      } catch (error) {
        console.error('Error fetching user sessions:', error);
        setErrorMessage('An error occurred while fetching user sessions');
      }

    };

    checkAdminSession();
    fetchSessions();
  }, [navigate]);

  // Function to handle search input change
  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value); 
    filterSessions(e.target.value); 
  };



  // Function to filter sessions 
  const filterSessions = (query) => {
    if (!query) {
      setFilteredSessions(sessions); 
    } else {
      const filtered = sessions.filter(session => 
        session.userEmail.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredSessions(filtered); 
    }
  };



// Function to calculate Time differnece
const calculateDuration = (entryTime, exitTime) => {
  if (!entryTime || !exitTime) {
    return ''; 
  }

  const entry = new Date(entryTime);
  const exit = new Date(exitTime);
  const diffInMilliseconds = exit - entry;
  const diffInSeconds = Math.floor(diffInMilliseconds / 1000); 
  const hours = Math.floor(diffInSeconds / 3600);
  const minutes = Math.floor((diffInSeconds % 3600) / 60);
  const seconds = diffInSeconds % 60;
  return `${hours}h ${minutes}m ${seconds}s`;
};
  

  const handleLogout = () => {
    
    sessionStorage.removeItem('isAdminLoggedIn') 
    sessionStorage.removeItem('email') 
    navigate('/login');    
  };

  return (
    <div>
      <h1 style={{ fontSize: '1.2rem' , color:'black'}}>Welcome, Admin</h1>
      <h2>Admin Page</h2>
      
      <div className="search-bar">
        <input 
          type="text" 
          placeholder="Search by Email ID" 
          value={searchQuery} 
          onChange={handleSearchInputChange} // Call handleSearchInputChange on input change
        />
      </div>

      <div className="sessions-container">
        {errorMessage && <div className='error-message'>{errorMessage}</div>}
        <table className="sessions-table">
          <thead>
            <tr>
              <th>Email ID</th>
              <th>Entry Time</th>
              <th>Exit Time</th>
              <th>Duration</th> 
            </tr>
          </thead>
          <tbody>
            {filteredSessions.map((session, index) => (
              <tr key={index}>
                <td>{session.userEmail}</td>
                <td>{session.entryTimeFormatted}</td>
                <td>{session.exitTimeFormatted}</td>
                <td>{calculateDuration(session.entryTime, session.exitTime)}</td> 
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="logout-container"> 
        <div className="button-container">
          <button onClick={handleLogout} style={{ fontSize: '12px', padding: '6px 12px' }}>Logout</button>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
