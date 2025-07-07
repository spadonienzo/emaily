import React from "react";
import { useSelector } from "react-redux";

const Header = () => {
  const auth = useSelector((state) => state.auth);

  const renderContent = () => {
    switch (auth) {
      case null:
        return null;
      case false:
        return (
          <li>
            <a href="/auth/google">Login With Google</a>
          </li>
        );
      default:
        return (
          <li>
            <a href="/api/logout">Logout</a>
          </li>
        );
    }
  };

  return (
    <nav>
      <div className="nav-wrapper">
        <a href="/" className="left brand-logo">
          Emaily
        </a>
        <ul className="right">{renderContent()}</ul>
      </div>
    </nav>
  );
};

export default Header;
