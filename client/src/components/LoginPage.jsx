import { useContext, useState } from "react"
import { Link, Navigate } from "react-router-dom"
import axios from "axios"
import { UserContext } from "../UserContext"

function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [redirect, setRedirect] = useState(false)
  const { setUser } = useContext(UserContext)
  async function handleLogin(ev) {
    ev.preventDefault()
    try {
      const { data } = await axios.post("/login", {
        email,
        password,
      })
      setUser(data)
      alert("Login successful!")
      setRedirect(true)
    } catch (e) {
      alert("Login failed. Please try again.")
    }
  }

  if (redirect) {
    return <Navigate to={"/"} />
  }

  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-40">
        <h1 className="text-4xl text-center mb-4">Login</h1>
        <form className="max-w-md mx-auto mb-3" onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="email"
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
          />
          <button className="primary">Login</button>
        </form>
        <p className="text-gray-500">
          Do not have an account yet?{" "}
          <Link to={"/register"} className="underline text-black">
            Register now
          </Link>
        </p>
      </div>
    </div>
  )
}
export default LoginPage
