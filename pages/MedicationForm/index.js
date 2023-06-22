import React, { useState } from "react";
import styled from "styled-components";

function FormComponent() {
  const [selectedMedication, setSelectedMedication] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [medicationName, setMedicationName] = useState("");
  const [saveData, setSaveData] = useState([]);

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

  const handleSave = () => {
    if (
      selectedMedication === null ||
      selectedTime === null ||
      medicationName === ""
    ) {
      return;
    }

    const newData = {
      medication: selectedMedication,
      time: selectedTime,
      name: medicationName,
    };

    setSaveData([...saveData, newData]);
    setSelectedMedication(null);
    setSelectedTime(null);
    setMedicationName("");
  };

  const weekdays = ["Mo", "Die", "Mi", "Do", "Fr", "Sa", "So"];
  const timesOfDay = ["morgens", "mittags", "abends"];

  return (
    <div>
      <h2>Wann wird das Medikament eingenommen?</h2>
      <Container>
        {weekdays.map((medication, index) => (
          <Box
            key={index}
            selected={selectedMedication === index}
            onClick={() => handleMedicationSelection(index)}
          >
            {medication}
          </Box>
        ))}
      </Container>
      <h2>Zu welcher Tageszeit?</h2>
      <Container>
        {timesOfDay.map((time, index) => (
          <Box
            key={index}
            selected={selectedTime === index}
            onClick={() => handleTimeSelection(index)}
          >
            {time}
          </Box>
        ))}
      </Container>
      <h2>Wie heißt das Medikament?</h2>
      <Input
        type="text"
        value={medicationName}
        onChange={handleMedicationNameChange}
      />
      <button onClick={handleSave}>Speichern</button>
      {saveData.map((data, index) => (
        <card key={index}>
          <div>Tag: {weekdays[data.medication]}</div>
          <div>Tageszeit: {timesOfDay[data.time]}</div>
          <div>Medikament: {data.name}</div>
        </card>
      ))}
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

const Container = styled.div`
  display: flex;
  flex-direction: row;
`;

const Input = styled.input`
  padding: 10px;
  margin: 5px;
`;
