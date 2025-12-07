import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  let navigate = useNavigate();
  let token = localStorage.getItem("token");

  let handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav style={{ padding: "10px", background: "#eee" }}>
      {token && (
        <>
          <Link to="/dashboard" style={{ marginRight: 15 }}>
            Dashboard
          </Link>
          <Link to="/profile" style={{ marginRight: 15 }}>
            Profile
          </Link>
          <Link to="/resources" style={{ marginRight: 15 }}>
            Resources
          </Link>
        </>
      )}
      {token ? (
        <button onClick={handleLogout}>Logout</button>
      ) : (
        <Link to="/">Login</Link>
      )}
    </nav>
  );
}

export default Navbar;
