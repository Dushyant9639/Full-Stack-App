import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await API.post("/register", { name, email, password });
      navigate("/");
    } catch (err) {
      alert("Registration failed");
    }
  };

  return (
    <form onSubmit={handleRegister} style={{ margin: 20 }}>
      <h2>Register</h2>

      <input type="text" placeholder="Name"
             onChange={(e) => setName(e.target.value)} /><br />

      <input type="email" placeholder="Email"
             onChange={(e) => setEmail(e.target.value)} /><br />

      <input type="password" placeholder="Password"
             onChange={(e) => setPassword(e.target.value)} /><br />

      <button type="submit">Register</button>
    </form>
  );
}

export default Register;
