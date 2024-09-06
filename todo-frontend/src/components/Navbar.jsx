import "bootstrap/dist/css/bootstrap.min.css";
import { Link, Outlet } from "react-router-dom";
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import Dropdown from 'react-bootstrap/Dropdown';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const navigate = useNavigate();

  useEffect(() => {
    const updateToken = () => {
      setToken(localStorage.getItem('token'));
    };

    // Listen for storage changes in case the token is modified outside the current tab
    window.addEventListener('storage', updateToken);

    return () => {
      window.removeEventListener('storage', updateToken);
    };
  }, [])




  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
    navigate('/home');
  }


  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
        <div className="container-fluid  d-flex justify-content-between align-items-center">
            <Link to={"/home"} className="text-decoration-none navbar-brand">Notes - Create your own notes and save them</Link>
            {token === null ?
            <div>
            <Link to={"/signup"}><button type="submit" className="btn btn-primary mx-2">Signup</button></Link>
            <Link to={"/login"}><button type="submit" className="btn btn-success mx-2">Login</button></Link>
          </div> : <>
              <Dropdown>
                <Dropdown.Toggle
                  variant="info"
                  id="dropdown-basic"
                  className="d-flex align-items-center"
                  style={{ backgroundColor: 'transparent', border: 'none' }}
                >
                  <AccountCircleOutlinedIcon className="mr-5" color="info" fontSize="large" />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item><Link to={'/profile'} className="text-decoration-none text-light">Profile</Link></Dropdown.Item>
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
