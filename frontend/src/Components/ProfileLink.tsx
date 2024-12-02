import React, { useState, useContext } from 'react';
import '../styles/profile_link.css';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const ProfileLink = () => {
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const { logout } = useContext(AuthContext)!;
    const navigate = useNavigate();

    const togglePopup = () => {
        setIsPopupVisible((prev) => !prev);
    };

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <div className="profile-link-container">
            <a onClick={togglePopup}>
                <img className="link-image" alt="React Logo" />
            </a>
            {isPopupVisible && (
                <div className="popup-menu">
                    <ul>
                        <li>
                            <Link
                                to="/profile"
                                style={{
                                    textDecoration: 'none',
                                    color: 'black',
                                }}
                            >
                                Profile
                            </Link>
                        </li>
                        <li
                            onClick={handleLogout}
                            style={{ cursor: 'pointer' }}
                        >
                            Logout
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default ProfileLink;
