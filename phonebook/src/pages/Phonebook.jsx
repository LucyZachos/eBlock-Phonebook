import React, { useState, useEffect } from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material"; // Import necessary components from MUI

export default function Phonebook() {
  // Define state variables for phonebooks, selected phonebook, filter text, and filtered entries
  const [phonebooks, setPhonebooks] = useState([]);
  const [selectedPhonebook, setSelectedPhonebook] = useState("");
  const [filterText, setFilterText] = useState("");
  const [filteredEntries, setFilteredEntries] = useState([]);

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

  // Use an effect to filter entries based on the selected phonebook and filter text
  useEffect(() => {
    if (selectedPhonebook) {
      // Find the selected phonebook in the list of phonebooks
      const targetPhonebook = phonebooks.find(
        (pb) => pb.name === selectedPhonebook
      );
      if (targetPhonebook) {
        // Filter entries (name and number) based on the filter text
        const filteredEntries = targetPhonebook.entries.filter(
          (entry) =>
            entry.name.toLowerCase().includes(filterText.toLowerCase()) ||
            entry.number.toLowerCase().includes(filterText.toLowerCase())
        );
        setFilteredEntries(filteredEntries);
      }
    } else {
      // If no phonebook is selected, clear the filtered entries
      setFilteredEntries([]);
    }
  }, [selectedPhonebook, filterText, phonebooks]);

  // Handle changes in the selected phonebook dropdown
  const handlePhonebookChange = (e) => {
    setSelectedPhonebook(e.target.value);
    // Clear the filter text when a new phonebook is selected
    setFilterText("");
  };

  // Handle changes in the filter input field
  const handleFilterChange = (e) => {
    setFilterText(e.target.value);
  };

  return (
    <div className="container">
      <h1 className="mainText">Phonebook</h1>

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
          {/* Input field for filtering entries */}
          <input
            type="text"
            className="inputField"
            id="filter"
            value={filterText}
            onChange={handleFilterChange}
          />
          <label for="filter" className="inputLabel">
            Filter
          </label>
        </div>
      </div>
      {selectedPhonebook && (
        <div className="filteredEntries">
          <h2 className="subText">Contact Details:</h2>
          <ul>
            {filteredEntries.map((entry) => (
              // Display filtered entries in a list
              <li key={entry.id}>
                {entry.name} {entry.number}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
