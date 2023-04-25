import { Link } from "react-router-dom"

function LoginPage() {
  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-40">
        <h1 className="text-4xl text-center mb-4">Login</h1>
        <form className="max-w-md mx-auto mb-3">
          <input type="email" placeholder="email" />
          <input type="password" placeholder="password" />
          <button className="primary">Login</button>
        </form>
        <p className="text-gray-500">
          Don't have an account yet?{" "}
          <Link to={"/register"} className="underline text-black">
            Register now
          </Link>
        </p>
      </div>
    </div>
  )
}
export default LoginPage
