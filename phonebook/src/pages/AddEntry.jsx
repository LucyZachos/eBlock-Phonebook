import React, { useState, useEffect } from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { Link } from "react-router-dom";

export default function AddEntry() {
  // Define state variables for phonebooks, selected phonebook, name, number, and messages
  const [phonebooks, setPhonebooks] = useState([]);
  const [selectedPhonebook, setSelectedPhonebook] = useState("");
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [message, setMessage] = useState("");
  const [selectionChanged, setSelectionChanged] = useState(false);

  // Fetch the list of phonebooks from a local API when the component mounts
  useEffect(() => {
    fetch("http://localhost:3001/phonebook")
      .then((response) => response.json())
      .then((data) => {
        setPhonebooks(data);
      })
      .catch((error) => {
        console.error("Error fetching phonebooks:", error);
      });
  }, []);

  // Handle changes in the selected phonebook dropdown
  const handlePhonebookChange = (e) => {
    setSelectedPhonebook(e.target.value);
    setSelectionChanged(true);
  };

  // Handle changes in the name input field
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  // Handle changes in the number input field
  const handleNumberChange = (e) => {
    const inputValue = e.target.value;

    // Use a regular expression to check if the input contains only numbers
    if (/^[0-9]*$/.test(inputValue)) {
      setNumber(inputValue);
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Format the phone number to a specific pattern
    const formattedNumber = number.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");
    const newEntry = {
      name,
      number: formattedNumber,
    };

    // Find the target phonebook based on the selected phonebook name
    const targetPhonebook = phonebooks.find(
      (pb) => pb.name === selectedPhonebook
    );

    // Check if a valid option is selected, the selection has changed, and input fields are not empty
    if (
      (targetPhonebook || selectionChanged) &&
      e.target.checkValidity() &&
      name.trim() !== "" &&
      number.trim() !== ""
    ) {
      if (targetPhonebook) {
        // Add the new entry to the target phonebook's entries
        targetPhonebook.entries.push(newEntry);

        // Send a PUT request to update the phonebook with the new entry
        fetch(`http://localhost:3001/phonebook/${targetPhonebook.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(targetPhonebook),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log("Entry created:", data);

            // Clear input fields and reset selected phonebook
            setName("");
            setNumber("");
            setSelectedPhonebook("");
            setSelectionChanged(false);

            // Set a success message and clear it after 3 seconds
            setMessage("Entry added successfully!");
            setTimeout(() => {
              setMessage("");
            }, 3000);
          })
          .catch((error) => {
            console.error("Error updating phonebook:", error);
          });
      }
    } else {
      // Display an error message if validation fails
      setMessage(
        "Please ensure you have selected a valid phonebook, and filled in all required fields"
      );

      // Clear the error message after 3 seconds
      setTimeout(() => {
        setMessage("");
      }, 3000);
    }
  };

  return (
    <div className="container">
      <h1 className="mainText">Add New Entry</h1>
      <div className="inputData">
        <div className="dropDown">
          {/* Dropdown to select a phonebook */}
          <FormControl sx={{ minWidth: "150px" }}>
            <InputLabel
              id="selectLabel"
              sx={{ textAlign: "center", width: "70%" }}
            >
              Phonebook
            </InputLabel>
            <Select
              id="phonebook"
              name="phonebook"
              onChange={handlePhonebookChange}
              value={selectedPhonebook}
              sx={{
                textAlign: "center",
                "& .MuiMenuItem-root": { height: "auto" },
              }}
            >
              {phonebooks.map((phonebook) => (
                // Display phonebook options in the dropdown
                <MenuItem key={phonebook.id} value={phonebook.name}>
                  {phonebook.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <div>
          {/* Input field for entering a name */}
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

        <div>
          {/* Input field for entering a phone number */}
          <input
            type="tel"
            className="inputField"
            name="number"
            id="number"
            value={number}
            onChange={handleNumberChange}
          />
          <label htmlFor="number" className="inputLabel">
            Number
          </label>
        </div>
      </div>
      <div className="buttonContainer">
        {/* Button to submit the form */}
        <button className="submitButton" onClick={handleSubmit}>
          SAVE
        </button>
        {/* Button to cancel and redirect to Phonebook page */}
        <Link to="/phonebook" className="cancelButton">
          CANCEL
        </Link>
      </div>
      {/* Display success or error messages */}
      {message && <p>{message}</p>}
    </div>
  );
}
