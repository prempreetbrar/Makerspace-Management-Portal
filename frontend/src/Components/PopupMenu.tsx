import React from 'react';
import '../styles/popup_menu.css';

interface PopupMenuProps {
  children: React.ReactNode;
  onClose: () => void;
}

const PopupMenu: React.FC<PopupMenuProps> = ({ children, onClose }) => {
  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <button className="close-button" onClick={onClose}>×</button>
        {children}
      </div>
    </div>
  );
};

export default PopupMenu;
