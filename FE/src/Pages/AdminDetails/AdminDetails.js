import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminDetails.css';

export default function AdminDetails() {
  const [adminDetails, setAdminDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8000/AdminMoreDetails')
      .then(response => {
        setAdminDetails(response.data.data[0]);
        setLoading(false);
      })
      .catch(error => {
        setError('Error fetching admin details');
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="profile-container">
      <div className="profile-header">
        <img src="https://firebasestorage.googleapis.com/v0/b/epiceventify-8f8dd.appspot.com/o/29ac5c44-785f-4c58-81b0-4f787975edbf.jpeg?alt=media&token=42cc1408-8435-488a-8023-530ca21cd8fe" alt="Profile" className="profile-image" />
        <h2>{adminDetails.fullName} {adminDetails.surname}</h2>
        <p className="job-title">{adminDetails.role}</p>
      </div>
      <div className="profile-details">
        <div className="detail-item">
          <span className="detail-icon">👤</span>
          <div className="detail-content">
            <label>First name</label>
            <p>{adminDetails.lastname}</p>
          </div>
        </div>
        <div className="detail-item">
          <span className="detail-icon">📧</span>
          <div className="detail-content">
            <label>Email</label>
            <p>{adminDetails.email}</p>
          </div>
        </div>
        <div className="detail-item">
          <span className="detail-icon">👥</span>
          <div className="detail-content">
            <label>Surname</label>
            <p>{adminDetails.surname}</p>
          </div>
        </div>
        <div className="detail-item">
          <span className="detail-icon">📱</span>
          <div className="detail-content">
            <label>Phone</label>
            <p>{adminDetails.phone}</p>
          </div>
        </div>
        <div className="detail-item">
          <span className="detail-icon">🎭</span>
          <div className="detail-content">
            <label>Role</label>
            <p>{adminDetails.role}</p>
          </div>
        </div>
      </div>
    </div>
  );
}