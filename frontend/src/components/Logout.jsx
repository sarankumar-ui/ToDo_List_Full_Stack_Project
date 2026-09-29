import { useNavigate } from "react-router-dom";

function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = () => {
    
    localStorage.removeItem("user");
    
    localStorage.removeItem("todos");

  
    navigate("/login", { replace: true });
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md font-semibold transition"
    >
      Logout
    </button>
  );
}

export default LogoutButton;
