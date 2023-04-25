import "./App.css"
import { Routes, Route } from "react-router-dom"
import IndexPage from "./components/IndexPage"
import LoginPage from "./components/LoginPage"
import RegisterPage from "./components/RegisterPage"
import Layout from "./Layout"
import axios from "axios"

axios.defaults.baseURL = "http://localhost:4000"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<IndexPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>
    </Routes>
  )
}

export default App
