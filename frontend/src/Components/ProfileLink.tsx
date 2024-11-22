import React, { useState } from 'react';
import '../styles/profile_link.css';
import { Link } from 'react-router-dom';

const ProfileLink = () => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const togglePopup = () => {
    setIsPopupVisible((prev) => !prev);
  };

  return (
    <div className="profile-link-container">
      <a onClick={togglePopup}>
        <img className="link-image" alt="React Logo" />
      </a>
      {isPopupVisible && (
        <div className="popup-menu">
          <ul>
            <li><Link to="/profile" style={{textDecoration: 'none', color: 'black'}}>Profile</Link></li>
            <li>Logout</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProfileLink;
