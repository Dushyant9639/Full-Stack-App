import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState(""); // show backend error

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await API.post("/register", { name, email, password });
      alert("Registration successful!");
      navigate("/login"); // redirect to login page
    } catch (err) {
      console.log(err.response?.data); // debug in console
      setError(err.response?.data?.msg || "Registration failed");
    }
  };

  return (
    <form onSubmit={handleRegister} style={{ margin: 20 }}>
      <h2>Register</h2>

      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      /><br />

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      /><br />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      /><br />

      <button type="submit">Register</button>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
}

export default Register;
