import React, { useState } from 'react';
import AzureFuncLogo from './azure-functions-logo.png';
import BookEmoji from './book-emoji.png'
import './App.css';

function App() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");
  const [catalogueData, setCatalogueData] = useState("");

  let handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch(process.env.REACT_APP_POST_URL, {
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

  let handleCatalogueFetch = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch(process.env.REACT_APP_GET_URL, {
        method: "GET",
      });

      if (res.status === 200) {
        res.json().then((value) => {
          const catalogue = value.map(element => element.name);
          console.log(catalogue);

          setCatalogueData(JSON.stringify(catalogue))
        });

      } else {
        console.log("error occured!")
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="App">
      <div class="container">
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

        <div class="getBtn"><button onClick={handleCatalogueFetch}>Get all items</button></div>
        <div class="data">
          {catalogueData}
        </div>
      </div>
    </div>

  );
}

export default App;
