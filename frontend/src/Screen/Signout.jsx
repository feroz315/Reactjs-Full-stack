import { useState } from 'react';
import axios from 'axios';


const Signout = () => {

 const [isLoading, setIsLoading] = useState(false);
 const [error, setError] = useState(null);

  const handleLogout = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Replace with your actual logout API endpoint
      const response = await axios.get('http://localhost:3000/api/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Include auth token if required (e.g., from localStorage)
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        },
      });

      if (!response.ok) {
        throw new Error('Logout failed');
      }

      // Clear stored token
      localStorage.removeItem('authToken');

      // Redirect to login page (adjust path as needed)
      window.location.href = '/signup';
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h2>Logout</h2>
      <p>Are you sure you want to log out?</p>
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      <button onClick={handleLogout} disabled={isLoading}>
        {isLoading ? 'Logging out...' : 'Logout'}
      </button>
    </div>
  );
};




export default Signout;

