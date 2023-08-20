import React, { useState } from "react";

export default function AddPhonebook() {
  // Define two state variables to hold the name and message
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  // This function updates the 'name' state when the input field changes
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  // This function is called when the form is submitted
  const handleSubmit = (e) => {
    e.preventDefault();

    // Create a new phonebook entry object with the entered name and an empty 'entries' array
    const newPhonebook = {
      name,
      entries: [],
    };

    // Send a POST request to a local API endpoint with the new phonebook data
    fetch("http://localhost:3001/phonebook", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPhonebook),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Phonebook entry created:", data);
        setName(""); // Clear the input field after successful submission
        setMessage("Phonebook added successfully!"); // Set a success message

        // Clear the success message after 3 seconds (3000 milliseconds)
        setTimeout(() => {
          setMessage("");
        }, 3000);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="container">
      <h1 className="mainText">Add New Phonebook</h1>
      <form onSubmit={handleSubmit}>
        <div className="inputData">
          <input
            type="text"
            className="inputField"
            name="name"
            id="name"
            value={name}
            onChange={handleNameChange}
            required
          />
          <label htmlFor="name" className="inputLabel">
            Name
          </label>
        </div>
        <div className="buttonContainer">
          <button type="submit" className="submitButton">
            SAVE
          </button>
          <button className="cancelButton">CANCEL</button>
        </div>
      </form>
      {/* Display the success message if it exists */}
      {message && <p>{message}</p>}
    </div>
  );
}
