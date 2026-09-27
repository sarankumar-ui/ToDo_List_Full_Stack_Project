
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



function ProtectedRoute({ children }) {

  const user = localStorage.getItem("user");

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}






function App() {

  return (

    <BrowserRouter>

      <Routes>

        

        <Route
          path="/"
          element={
            <Navigate
              to="/login"
              replace
            />
          }
        />


        

        <Route
          path="/login"
          element={<Login />}
        />


        

        <Route
          path="/signup"
          element={<Signup />}
        />


       

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />


        

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
