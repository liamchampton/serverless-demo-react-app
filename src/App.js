import React, { useState } from 'react';
import AzureFuncLogo from './azure-functions-logo.png';
import BookEmoji from './book-emoji.png'
import './App.css';

function App() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");

  let handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch(process.env.REACT_APP_FUNC_URL, {
        method: "POST",
        body: JSON.stringify({
          name: name,
          price: price,
          description: description,
        }),
      });

      if (res.status === 200) {
        setName("");
        setPrice("");
        setDescription("");
        setMessage("Item submitted successfully");
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
      <div className="iconDiv">
        <img className="icon" src={AzureFuncLogo} alt="azure functions logo" />
        <img className="icon" src={BookEmoji} alt="book emoji" />
      </div>
        <h1>Add an item to the catalogue</h1>
        <input
          type="text"
          value={name}
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          prefix='£'
          value={price}
          placeholder="Price"
          onChange={(e) => setPrice(e.target.value)}
        />
        <input
          type="textarea"
          value={description}
          placeholder="Description"
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit">Create</button>

        <div className="message">{message ? <p>{message}</p> : null}</div>
      </form>
    </div>
  );
}

export default App;
