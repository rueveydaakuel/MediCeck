import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Navigation from "../../components/Navigation/index.js";
import { useRouter } from "next/router";

function FormComponent() {
  const [selectedMedication, setSelectedMedication] = useState([]);
  const [selectedTime, setSelectedTime] = useState([]);
  const [medicationName, setMedicationName] = useState("");
  const [saveData, setSaveData] = useState([]);
  const router = useRouter();
  const { name } = router.query;

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("medicationData")) || [];
    setSaveData(savedData);
  }, []);

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
    if (selectedTime.includes(index)) {
      setSelectedTime(selectedTime.filter((time) => time !== index));
    } else {
      setSelectedTime([...selectedTime, index]);
    }
  };

  const handleMedicationNameChange = (event) => {
    setMedicationName(event.target.value);
  };

  const handleSave = () => {
    if (
      selectedMedication.length === 0 ||
      selectedTime.length === 0 ||
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

    const savedData = JSON.parse(localStorage.getItem("medicationData")) || [];
    const updatedData = [...savedData, newData];

    localStorage.setItem("medicationData", JSON.stringify(updatedData));

    setSaveData(updatedData);
    setSelectedMedication([]);
    setSelectedTime([]);
    setMedicationName("");

    router.push({
      pathname: "/overview",
      query: { medicationData: JSON.stringify(updatedData) },
    });
  };

  const weekdays = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];
  const timesOfDay = ["morgens", "mittags", "abends"];

  return (
    <div>
      <QuestionContainer>
        <h2>Wann wird das Medikament eingenommen?</h2>
        <Container>
          {weekdays.map((medication, index) => (
            <Button
              key={index}
              selected={selectedMedication.includes(index)}
              onClick={() => handleMedicationSelection(index)}
            >
              {medication}
            </Button>
          ))}
        </Container>
      </QuestionContainer>
      <QuestionContainer>
        <h2>Zu welcher Tageszeit?</h2>
        <Container>
          {timesOfDay.map((time, index) => (
            <Button
              key={index}
              selected={selectedTime.includes(index)}
              onClick={() => handleTimeSelection(index)}
            >
              {time}
            </Button>
          ))}
        </Container>
      </QuestionContainer>
      <QuestionContainer>
        <h2>Wie heißt das Medikament?</h2>
        <Input
          type="text"
          value={medicationName}
          onChange={handleMedicationNameChange}
        />
      </QuestionContainer>
      <ButtonContainer>
        <button onClick={handleSave}>Speichern</button>
      </ButtonContainer>
      <Navigation />
    </div>
  );
}

export default FormComponent;

const Button = styled.button`
  background-color: ${(props) => (props.selected ? "lightskyblue" : "silver")};
  color: ${(props) => (props.selected ? "white" : "black")};
  padding: 10px;
  margin: 5px;
`;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 0 auto;
  max-width: 800px;
`;

const Input = styled.input`
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

const QuestionContainer = styled.div`
  text-align: center;
`;
