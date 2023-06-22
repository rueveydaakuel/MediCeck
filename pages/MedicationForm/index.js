import React, { useState } from "react";
import styled from "styled-components";

function FormComponent() {
  const [selectedMedication, setSelectedMedication] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [medicationName, setMedicationName] = useState("");

  const handleMedicationSelection = (index) => {
    setSelectedMedication(index);
    setSelectedTime(null);
  };

  const handleTimeSelection = (index) => {
    if (selectedMedication !== null) {
      setSelectedTime(index);
    }
  };

  const handleMedicationNameChange = (event) => {
    setMedicationName(event.target.value);
  };

  return (
    <div>
      <h2>Wann wird das Medikament eingenommen?</h2>

      {["Mo", "Die", "Mi", "Do", "Fr", "Sa", "So"].map((medication, index) => (
        <Box
          key={index}
          selected={selectedMedication === index}
          onClick={() => handleMedicationSelection(index)}
        >
          {medication}
        </Box>
      ))}

      <h2>Zu welcher Tageszeit?</h2>

      {["morgens", "mittags", "abends"].map((time, index) => (
        <Box
          key={index}
          selected={selectedTime === index}
          onClick={() => handleTimeSelection(index)}
        >
          {time}
        </Box>
      ))}

      <h2>Wie heißt das Medikament?</h2>
      <input
        type="text"
        value={medicationName}
        onChange={handleMedicationNameChange}
      />
    </div>
  );
}

export default FormComponent;

const Box = styled.div`
  background-color: ${(props) => (props.selected ? "lightskyblue" : "silver")};
  color: ${(props) => (props.selected ? "white" : "black")};
  padding: 10px;
  margin: 5px;
`;
