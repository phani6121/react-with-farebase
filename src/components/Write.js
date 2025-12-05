import React, { useState } from 'react';
import app from "../firebaseConfig";
import { getDatabase, ref, push, set } from "firebase/database";
import { useNavigate } from 'react-router-dom';

function Write() {
  const navigate = useNavigate();
  const [inputValue1, setInputValue1] = useState("");
  const [inputValue2, setInputValue2] = useState("");

  const saveData = async () => {
    const db = getDatabase(app);
    const newRef = push(ref(db, "nature/fruits"));
    await set(newRef, { fruitName: inputValue1, fruitDefinition: inputValue2 });
    alert("Data saved successfully!");
  }

  return (
    <div className="container">
      <h1>Add Fruit</h1>
      <input type="text" value={inputValue1} onChange={(e) => setInputValue1(e.target.value)} placeholder="Fruit Name"/>
      <input type="text" value={inputValue2} onChange={(e) => setInputValue2(e.target.value)} placeholder="Fruit Definition"/> <br/>
      <button className="main-btn" onClick={saveData}>SAVE DATA</button> <br/><br/>
      <button className="main-btn" onClick={() => navigate("/updateread")}>GO UPDATE READ</button>
      <button className="main-btn" onClick={() => navigate("/read")}>GO READ PAGE</button>
    </div>
  )
}

export default Write;
