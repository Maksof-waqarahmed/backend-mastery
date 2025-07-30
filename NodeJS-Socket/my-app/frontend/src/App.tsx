import { Navigate, Route, Routes } from "react-router-dom"
import Login from "./pages/auth/login"
import Register from "./pages/auth/register"

function App() {

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/Login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  )
}

export default App
