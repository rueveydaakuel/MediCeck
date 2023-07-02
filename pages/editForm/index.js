import React, { useState } from "react";
import styled from "styled-components";

const weekdays = [
  "Montag",
  "Dienstag",
  "Mittwoch",
  "Donnerstag",
  "Freitag",
  "Samstag",
  "Sonntag",
];
const timesOfDay = ["morgens", "mittags", "abends"];

export default function EditForm({ item, onSave, onCancel }) {
  const [editedItem, setEditedItem] = useState({
    ...item,
    medication: Array.isArray(item.medication) ? item.medication : [],
    time: Array.isArray(item.time) ? item.time : [],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setEditedItem((prevItem) => ({
      ...prevItem,
      [name]: value,
    }));
  };

  const handleSelection = (name, value) => {
    setEditedItem((prevItem) => {
      if (prevItem[name].includes(value)) {
        return {
          ...prevItem,
          [name]: prevItem[name].filter((val) => val !== value),
        };
      } else {
        return {
          ...prevItem,
          [name]: [...prevItem[name], value],
        };
      }
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSave(editedItem);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Bearbeiten</h2>
      <label htmlFor="person">Person:</label>
      <input
        type="text"
        id="person"
        name="Person"
        value={editedItem.Person}
        onChange={handleInputChange}
      />
      <label>Tag:</label>
      {weekdays.map((weekday, index) => (
        <button
          key={index}
          selected={editedItem.medication.includes(index)}
          onClick={() => handleSelection("medication", index)}
          type="button"
          aria-label={`Wochentag: ${weekday}`}
        >
          {weekday}
        </button>
      ))}
      <label>Tageszeit:</label>
      {timesOfDay.map((time, index) => (
        <button
          key={index}
          selected={editedItem.time.includes(index)}
          onClick={() => handleSelection("time", index)}
          type="button"
          aria-label={`Tageszeit: ${time}`}
        >
          {time}
        </button>
      ))}
      <label
        htmlFor="
          medicationName"
      >
        Medikament:
      </label>
      <input
        type="text"
        id="medicationName"
        name="medicationName"
        value={editedItem.medicationName}
        onChange={handleInputChange}
      />
      <button type="submit">Speichern</button>
      <button type="button" onClick={onCancel}>
        Abbrechen
      </button>
    </form>
  );
}
