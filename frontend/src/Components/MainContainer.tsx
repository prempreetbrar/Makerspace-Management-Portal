import React from 'react';
import '../styles/main_container.css';

const MainContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="container">
      {children}
    </div>
  );
};

export default MainContainer;
