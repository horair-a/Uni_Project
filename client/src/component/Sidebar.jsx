import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaTachometerAlt, FaBox, FaTruck, FaUsers, FaFileAlt, FaCog, FaCaretDown, FaCaretUp } from "react-icons/fa";

const Sidebar = () => {
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (section) => {
    setOpenDropdown(openDropdown === section ? null : section);
  };

  return (
    <div className="sidebar">
      <h2>Menu</h2>
      <ul>
        {/* Dashboard */}
        <li>
          <Link to="/dashboard">
            <FaTachometerAlt /> Dashboard
          </Link>
        </li>

        {/* Orders Dropdown */}
        <li>
          <div className="dropdown">
            <span className="dropdown-toggle" onClick={() => toggleDropdown("orders")}>
              <FaBox /> Products {openDropdown === "orders" ? <FaCaretUp /> : <FaCaretDown />}
            </span>
            {openDropdown === "orders" && (
              <ul className="dropdown-menu">
                <li><Link to="/add-order">Add Product</Link></li>
                <li><Link to="/manage-orders">Manage Products</Link></li>
                <li><Link to="/orders">View Product</Link></li>
              </ul>
            )}
          </div>
        </li>

        <li>
          <div className="dropdown">
            <span className="dropdown-toggle" onClick={() => toggleDropdown("employees")}>
              <FaUsers /> Orders {openDropdown === "employees" ? <FaCaretUp /> : <FaCaretDown />}
            </span>
            {openDropdown === "employees" && (
              <ul className="dropdown-menu">
                <li><Link to="/approve">Approve Orders</Link></li>
                {/* <li><Link to="/manage-userss">Request Orders</Link></li> */}
              </ul>
            )}
          </div>
        </li>

          <li>
          <div className="dropdown">
            <span className="dropdown-toggle" onClick={() => toggleDropdown("employees")}>
              <FaUsers /> Employees {openDropdown === "employees" ? <FaCaretUp /> : <FaCaretDown />}
            </span>
            {openDropdown === "employees" && (
              <ul className="dropdown-menu">
                {/* <li><Link to="/add-user">Add Employee</Link></li> */}
                <li><Link to="/manage-users">Manage Employees</Link></li>
              </ul>
            )}
          </div>
        </li>

        {/* Sales & Reports Dropdown */}
        <li>
          <div className="dropdown">
            <span className="dropdown-toggle" onClick={() => toggleDropdown("sales-reports")}>
              <FaFileAlt /> Sales & Reports {openDropdown === "sales-reports" ? <FaCaretUp /> : <FaCaretDown />}
            </span>
            {openDropdown === "sales-reports" && (
              <ul className="dropdown-menu">
                <li><Link to="/sales">Sales</Link></li>
                <li><Link to="/reports">Reports</Link></li>
              </ul>
            )}
          </div>
        </li>

        {/* Employees Dropdown */}
        {/* <li>
          <div className="dropdown">
            <span className="dropdown-toggle" onClick={() => toggleDropdown("employees")}>
              <FaUsers /> Employees {openDropdown === "employees" ? <FaCaretUp /> : <FaCaretDown />}
            </span>
            {openDropdown === "employees" && (
              <ul className="dropdown-menu">
                <li><Link to="/add-user">Add Employee</Link></li>
                <li><Link to="/manage-users">Manage Employees</Link></li>
              </ul>
            )}
          </div>
        </li> */}
        {/* <li>
          <div className="dropdown">
            <span className="dropdown-toggle" onClick={() => toggleDropdown("employees")}>
              <FaUsers /> Orders {openDropdown === "employees" ? <FaCaretUp /> : <FaCaretDown />}
            </span>
            {openDropdown === "employees" && (
              <ul className="dropdown-menu">
                <li><Link to="/add-user">Approve Orders</Link></li>
                <li><Link to="/manage-users">Request Orders</Link></li>
              </ul>
            )}
          </div>
        </li> */}

      </ul>
    </div>
  );
};

export default Sidebar;
