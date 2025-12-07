import { useEffect, useState } from "react";
import API from "../services/api";

function Profile() {
  const [data, setData] = useState(null);
  const [name, setName] = useState("");

  useEffect(() => {
    API.get("/profile").then((res) => {
      setData(res.data);
      setName(res.data.name);
    });
  }, []);

  const handleUpdate = async () => {
    await API.put("/profile", { name });
    alert("Updated!");
  };

  return (
    <div style={{ margin: 20 }}>
      <h2>Profile</h2>

      {data && (
        <>
          <p>Email: {data.email}</p>

          <input value={name} onChange={(e) => setName(e.target.value)} />

          <button onClick={handleUpdate}>Update</button>
        </>
      )}
    </div>
  );
}

export default Profile;
