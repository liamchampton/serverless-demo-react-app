import React, { useState } from 'react';
// import logo from './logo.svg';
import './App.css';

function App() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  let handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch(process.env.REACT_APP_FUNC_URL, {
        method: "POST",
        body: JSON.stringify({
          name: name,
        }),
      });

      if (res.status === 200) {
        setName("");
        setMessage("Name submitted successfully");
      } else {
        setMessage("An error occured");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit">Create</button>

        <div className="message">{message ? <p>{message}</p> : null}</div>
      </form>
    </div>
  );
}

export default App;
