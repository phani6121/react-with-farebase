import React, { useState, useEffect } from 'react';
import app from "../firebaseConfig";
import { getDatabase, ref, get, set } from "firebase/database";
import { useNavigate, useParams } from 'react-router-dom';

function UpdateWrite() {
  const navigate = useNavigate();
  const { firebaseId } = useParams();
  const [inputValue1, setInputValue1] = useState("");
  const [inputValue2, setInputValue2] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const db = getDatabase(app);
      const dbRef = ref(db, "nature/fruits/" + firebaseId);
      const snapshot = await get(dbRef);
      if(snapshot.exists()) {
        const data = snapshot.val();
        setInputValue1(data.fruitName);
        setInputValue2(data.fruitDefinition);
      } else {
        alert("No data found!");
      }
    }
    fetchData();
  }, [firebaseId]);

  const overwriteData = async () => {
    const db = getDatabase(app);
    const dbRef = ref(db, "nature/fruits/" + firebaseId);
    await set(dbRef, { fruitName: inputValue1, fruitDefinition: inputValue2 });
    alert("Data updated successfully!");
  }

  return (
    <div className="container">
      <h1>Update Fruit</h1>
      <input type="text" value={inputValue1} onChange={(e) => setInputValue1(e.target.value)} placeholder="Fruit Name"/>
      <input type="text" value={inputValue2} onChange={(e) => setInputValue2(e.target.value)} placeholder="Fruit Definition"/> <br/>
      <button className="main-btn" onClick={overwriteData}>UPDATE</button> <br/><br/>
      <button className="main-btn" onClick={() => navigate("/updateread")}>GO UPDATE READ</button>
      <button className="main-btn" onClick={() => navigate("/read")}>GO READ PAGE</button>
    </div>
  )
}

export default UpdateWrite;
