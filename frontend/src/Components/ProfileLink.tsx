import React, { useState } from 'react';
import '../styles/profile_link.css';

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
            <li>Profile</li>
            <li>Logout</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProfileLink;
