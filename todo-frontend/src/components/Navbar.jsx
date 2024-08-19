import "bootstrap/dist/css/bootstrap.min.css";
import { Link, Outlet } from "react-router-dom";

function Navbar() {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
        <div className="container-fluid  d-flex justify-content-between align-items-center">
            <Link to={"/home"} className="text-decoration-none navbar-brand">Notes - Create your own notes and save them</Link>
          <form action="">
            <Link to={"/signup"}><button type="submit" className="btn btn-primary mx-2">Signup</button></Link>
            <Link to={"/login"}><button type="submit" className="btn btn-success mx-2">Login</button></Link>
          </form>
        </div>
      </nav>
      <div> <Outlet /> </div>
    </>
  );
}

export default Navbar;
