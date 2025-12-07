import { useEffect, useState } from "react";
import API from "../services/api";

function Resources() {
  const [resources, setResources] = useState([]);
  const [title, setTitle] = useState("");

  const load = async () => {
    const res = await API.get("/resources");
    setResources(res.data);
  };

  const create = async () => {
    await API.post("/resources", { title });
    setTitle("");
    load();
  };

  const remove = async (id) => {
    await API.delete(`/resources/${id}`);
    load();
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div style={{ margin: 20 }}>
      <h2>Resources</h2>

      <input
        placeholder="Enter title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <button onClick={create}>Add</button>

      <ul>
        {resources.map((r) => (
          <li key={r._id}>
            {r.title}
            <button onClick={() => remove(r._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Resources;
