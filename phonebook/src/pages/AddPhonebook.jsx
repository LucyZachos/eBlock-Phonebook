import React, { useState, useEffect } from "react";

export default function AddPhonebook() {
  // Define two state variables to hold the name and message
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // This function updates the 'name' state when the input field changes
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  // This function is called when the form is submitted
  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if the submit button that was clicked is the "SAVE" button
    if (e.nativeEvent.submitter.name === "saveButton") {
      // Check if the name field is empty
      if (!name) {
        setError("Name field cannot be empty!");

        // Set a timer to clear the error message after 3 seconds
        setTimeout(() => {
          setError("");
        }, 3000);

        return; // Prevent form submission if the name field is empty
      }

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
          setError(""); // Clear any previous error message
        })
        .catch((error) => {
          console.error("Error:", error);
          setError("An error occurred while adding the phonebook."); // Set an error message
        });
    }
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
          />
          <label htmlFor="name" className="inputLabel">
            Name
          </label>
        </div>
        <div className="buttonContainer">
          <button type="submit" className="submitButton" name="saveButton">
            SAVE
          </button>
          <button type="button" className="cancelButton">
            CANCEL
          </button>
        </div>
      </form>
      {/* Display the error message if it exists */}
      {error && <p className="errorMessage">{error}</p>}
      {/* Display the success message if it exists */}
      {message && <p className="successMessage">{message}</p>}
    </div>
  );
}
