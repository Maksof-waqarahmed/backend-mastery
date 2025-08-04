import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import Dashboard from "./pages/dashboard";

function App() {
  const router = createBrowserRouter([
    { index: true, element: <Navigate to="/login" replace /> },
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
    { path: "/dashboard", element: <Dashboard /> },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
