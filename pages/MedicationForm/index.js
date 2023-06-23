import React, { useState } from "react";
import styled from "styled-components";
import Navigation from "../../components/Navigation/index.js";
import { useRouter } from "next/router";

function FormComponent() {
  const [selectedMedication, setSelectedMedication] = useState([]);
  const [selectedTime, setSelectedTime] = useState(null);
  const [medicationName, setMedicationName] = useState("");
  const [saveData, setSaveData] = useState([]);
  const router = useRouter();
  const { name } = router.query;

  const handleMedicationSelection = (index) => {
    if (!selectedMedication) {
      setSelectedMedication([]);
    }
    if (selectedMedication.includes(index)) {
      setSelectedMedication(selectedMedication.filter((day) => day !== index));
    } else {
      setSelectedMedication([...selectedMedication, index]);
    }
  };

  const handleTimeSelection = (index) => {
    if (selectedMedication.length > 0) {
      setSelectedTime(index);
    }
  };

  const handleMedicationNameChange = (event) => {
    setMedicationName(event.target.value);
  };

  const handleSave = () => {
    if (
      selectedMedication.length === 0 ||
      selectedTime === null ||
      medicationName === "" ||
      name === ""
    ) {
      return;
    }

    const newData = {
      medication: selectedMedication,
      time: selectedTime,
      medicationName: medicationName,
      Person: name,
    };

    setSaveData([...saveData, newData]);
    setSelectedMedication([]);
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
            selected={selectedMedication.includes(index)}
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
          <div>Person: {data.Person}</div>
          <div>
            Tag: {data.medication.map((day) => weekdays[day]).join(", ")}
          </div>
          <div>Tageszeit: {timesOfDay[data.time]}</div>
          <div>Medikament: {data.medicationName}</div>
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
