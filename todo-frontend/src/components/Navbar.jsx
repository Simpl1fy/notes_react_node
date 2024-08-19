import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
        <div className="container-fluid  d-flex justify-content-between align-items-center">
          <a className="navbar-brand" href="#">
            Notes - Create your own notes and save them
          </a>
          <form action="">
            <Link to={"/signup"}><button type="submit" className="btn btn-primary mx-2">Signup</button></Link>
            <Link to={"/login"}><button type="submit" className="btn btn-success mx-2">Login</button></Link>
          </form>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
