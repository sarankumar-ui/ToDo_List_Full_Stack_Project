
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "./pages/Login/Login";
import Signup from "./pages/Login/Signup";
import Dashboard from "./pages/Dashboard";
import "./App.css";



// PROTECTED ROUTE


function ProtectedRoute({ children }) {

  const user = localStorage.getItem("user");

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}



// APP////////
// ==========================================

function App() {

  return (

    <BrowserRouter>

      <Routes>

        {/* ROOT */}

        <Route
          path="/"
          element={
            <Navigate
              to="/login"
              replace
            />
          }
        />


        {/* LOGIN */}

        <Route
          path="/login"
          element={<Login />}
        />


        {/* SIGNUP */}

        <Route
          path="/signup"
          element={<Signup />}
        />


        {/* DASHBOARD */}

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />


        {/* INVALID URL */}

        <Route
          path="*"
          element={
            <Navigate
              to="/login"
              replace
            />
          }
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;
