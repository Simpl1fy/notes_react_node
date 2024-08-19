import { Link } from "react-router-dom";

export default function Signup() {
  return (
    <div className="form-container bg-primary vh-100 px-3 py-3 d-flex justify-content-center align-items-center">
      <form className="bg-light px-3 py-3 border border-2 rounded-2 border-dark w-25">
        <h2 className="mb-3">Signup</h2>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            <strong>Name:</strong>
          </label>
          <input
            type="text"
            name="name"
            id="name"
            className="form-control"
            placeholder="John Doe"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            <strong>Email:</strong>
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="form-control"
            placeholder="xyz@gmail.com"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            <strong>Password:</strong>
          </label>
          <input
            type="text"
            name="password"
            id="password"
            className="form-control"
          />
        </div>
        <div>
          <button type="submit" className="btn btn-primary">
            Signup
          </button>
        </div>
        <div className="pt-2">
            Already have an account?
            <Link to={"/login"} className="px-2 text-decoration-none">
              <strong>Login</strong>
            </Link>
        </div>
      </form>
    </div>
  );
}
