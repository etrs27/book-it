import { useState } from "react"
import { Link } from "react-router-dom"
import axios from "axios"

function RegisterPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  async function handleRegister(ev) {
    ev.preventDefault()
    try {
      await axios.post("/register", {
        name,
        email,
        password,
      })
      alert("Registration successful!")
    } catch (e) {
      alert("Registration failed. Please try again.")
    }
  }

  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-40">
        <h1 className="text-4xl text-center mb-4">Register</h1>
        <form className="max-w-md mx-auto mb-3" onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="name"
            value={name}
            onChange={(ev) => setName(ev.target.value)}
          />
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
          <button className="primary">Register</button>
        </form>
        <p className="text-gray-500">
          Already have an account?{" "}
          <Link to={"/login"} className="underline text-black">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}
export default RegisterPage
