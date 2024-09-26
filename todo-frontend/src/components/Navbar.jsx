import "bootstrap/dist/css/bootstrap.min.css";
import { Link, Outlet, useNavigate } from "react-router-dom";
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import Dropdown from 'react-bootstrap/Dropdown';
import { useAuth } from "./useAuth";
// import { useEffect, useState } from "react";

function Navbar() {
  const { isLoggedIn, logout, isMobile } = useAuth();

  const navigate = useNavigate();

  const handleProfileClick = () => navigate('/profile');

  const handleLogout = () => {
    logout();
    navigate('/home');
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
        <div className="container-fluid  d-flex justify-content-between align-items-center">
            <Link to={"/home"} className="text-decoration-none navbar-brand">{isMobile ? 'Notes' : 'Notes - Create your own notes and save them'}</Link>
            {!isLoggedIn ?
              <div>
                <Link to={"/signup"}><button type="submit" className="btn btn-primary mx-2">Signup</button></Link>
                <Link to={"/login"}><button type="submit" className="btn btn-success ms-2">Login</button></Link>
              </div> : 
              <>
              <Dropdown>
                <Dropdown.Toggle
                  variant="info"
                  id="dropdown-basic"
                  className="d-flex align-items-center"
                  style={{ backgroundColor: 'transparent', border: 'none' }}
                >
                  <AccountCircleOutlinedIcon className="mr-5" color="info" fontSize="medium" />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={handleProfileClick}>Profile</Dropdown.Item>
                  <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              </>
            }
            
        </div>
      </nav>
      <div> <Outlet /> </div>
    </>
  );
}

export default Navbar;
