import React, { useState } from 'react';
import app from "../firebaseConfig";
import { getDatabase, ref, get, remove } from "firebase/database";
import { useNavigate } from 'react-router-dom';

function UpdateRead() {
  const navigate = useNavigate();
  const [fruitArray, setFruitArray] = useState([]);

  const fetchData = async () => {
    const db = getDatabase(app);
    const dbRef = ref(db, "nature/fruits");
    const snapshot = await get(dbRef);
    if(snapshot.exists()) {
      const data = snapshot.val();
      const tempArray = Object.keys(data).map(key => ({ ...data[key], fruitId: key }));
      setFruitArray(tempArray);
    } else {
      alert("No data found!");
    }
  }

  const deleteFruit = async (id) => {
    const db = getDatabase(app);
    const dbRef = ref(db, "nature/fruits/" + id);
    await remove(dbRef);
    setFruitArray(fruitArray.filter(item => item.fruitId !== id));
  }

  return (
    <div className="container">
      <h1>Update Fruits</h1>
      <button className="main-btn" onClick={fetchData}>Display Data</button>
      
      {fruitArray.map((item, index) => (
        <div className="card" key={index}>
          <h3>{item.fruitName}</h3>
          <p>{item.fruitDefinition}</p>
          <button className="update-btn" onClick={() => navigate(`/updatewrite/${item.fruitId}`)}>UPDATE</button>
          <button className="delete-btn" onClick={() => deleteFruit(item.fruitId)}>DELETE</button>
        </div>
      ))}

      <button className="main-btn" onClick={() => navigate("/")}>GO HOMEPAGE</button>
      <button className="main-btn" onClick={() => navigate("/read")}>GO READ PAGE</button>
    </div>
  )
}

export default UpdateRead;
