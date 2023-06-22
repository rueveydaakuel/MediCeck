import React, { useState } from "react";
import styled from "styled-components";
import Navigation from "../../components/Navigation/index.js";

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
      <ButtonContainer>
        <button onClick={handleSave}>Speichern</button>
      </ButtonContainer>
      {saveData.map((data, index) => (
        <Card key={index}>
          <div>Tag: {weekdays[data.medication]}</div>
          <div>Tageszeit: {timesOfDay[data.time]}</div>
          <div>Medikament: {data.name}</div>
        </Card>
      ))}
      <Navigation />
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
  width: 50%;
`;

const Card = styled.div`
  border: 1px solid black;
  padding: 10px;
  margin: 5px;
  width: 50%;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;

  button {
    color: green;
    padding: 10px;
    border: 1px solid green;
  }
`;
