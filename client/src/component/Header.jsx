import React from "react";

const Header = () => {
  return (
    <header className="header">
      <div className="header-left">
        <h1>CUET STORE</h1>
      </div>
      <div className="header-right">
        <span className="header-option">Dashboard</span>
        <span className="header-option">Logout</span>
      </div>
    </header>
  );
};

export default Header;
