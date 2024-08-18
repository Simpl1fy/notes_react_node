import "bootstrap/dist/css/bootstrap.min.css";

function Navbar() {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
        <div className="container-fluid  d-flex justify-content-center">
          <a className="navbar-brand" href="#">
            Todo App
          </a>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
