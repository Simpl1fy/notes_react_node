import { Link } from "react-router-dom"

export default function Login() {
  return (
    <div className="form-container bg-primary vh-100 px-3 py-3 d-flex justify-content-center align-items-center">
      <form className="bg-light px-3 py-3 border border-2 rounded-2 border-dark w-25">
        <h2 className="mb-3">Login</h2>
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
            Login
          </button>
        </div>
        <div className="pt-2">
            Don&apos;t have an account?
            <Link to={"/signup"} className="px-2 text-decoration-none">
              <strong>Create One</strong>
            </Link>
        </div>
      </form>
    </div>
  )
}
