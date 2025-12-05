import React, { useState } from 'react';
import app from "../firebaseConfig";
import { getDatabase, ref, get } from "firebase/database";
import { useNavigate } from 'react-router-dom';

function Read() {
  const navigate = useNavigate();
  const [fruitArray, setFruitArray] = useState([]);

  const fetchData = async () => {
    const db = getDatabase(app);
    const dbRef = ref(db, "nature/fruits");
    const snapshot = await get(dbRef);
    if(snapshot.exists()) {
      setFruitArray(Object.values(snapshot.val()));
    } else {
      alert("No data found!");
    }
  }

  return (
    <div className="container">
      <h1>Fruits List</h1>
      <button className="main-btn" onClick={fetchData}>Display Data</button>
      
      {fruitArray.map((item, index) => (
        <div className="card" key={index}>
          <h3>{item.fruitName}</h3>
          <p>{item.fruitDefinition}</p>
        </div>
      ))}

      <button className="main-btn" onClick={() => navigate("/updateread")}>GO UPDATE READ</button>
      <button className="main-btn" onClick={() => navigate("/")}>GO HOMEPAGE</button>
    </div>
  )
}

export default Read;
