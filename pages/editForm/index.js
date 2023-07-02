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
    <Form onSubmit={handleSubmit}>
      <Heading>Bearbeiten</Heading>
      <FormGroup>
        <Label htmlFor="person">Person:</Label>
        <Input
          type="text"
          id="person"
          name="Person"
          value={editedItem.Person}
          onChange={handleInputChange}
        />
      </FormGroup>
      <FormGroup>
        <Label>Tag:</Label>
        <ButtonGroup>
          {weekdays.map((weekday, index) => (
            <Button
              key={index}
              selected={editedItem.medication.includes(index)}
              onClick={() => handleSelection("medication", index)}
              type="button"
              aria-label={`Wochentag: ${weekday}`}
            >
              {weekday}
            </Button>
          ))}
        </ButtonGroup>
      </FormGroup>
      <FormGroup>
        <Label>Tageszeit:</Label>
        <ButtonGroup>
          {timesOfDay.map((time, index) => (
            <Button
              key={index}
              selected={editedItem.time.includes(index)}
              onClick={() => handleSelection("time", index)}
              type="button"
              aria-label={`Tageszeit: ${time}`}
            >
              {time}
            </Button>
          ))}
        </ButtonGroup>
      </FormGroup>
      <FormGroup>
        <Label
          htmlFor="
          medicationName"
        >
          Medikament:
        </Label>
        <Input
          type="text"
          id="medicationName"
          name="medicationName"
          value={editedItem.medicationName}
          onChange={handleInputChange}
        />
      </FormGroup>
      <ButtonContainer>
        <SubmitButton type="submit">Speichern</SubmitButton>
        <CancelButton type="button" onClick={onCancel}>
          Abbrechen
        </CancelButton>
      </ButtonContainer>
    </Form>
  );
}

const Button = styled.button`
  background-color: ${(props) => (props.selected ? "#3A98B9" : "#E8D5C4")};
  color: ${(props) => (props.selected ? "white" : "black")};
  padding: 10px;
  margin-right: 5px;
  border: none;
  border-radius: 4px;
  flex: 0 0 auto;
  margin-bottom: 5px;
`;

const Form = styled.form`
  padding: 20px;
  background-color: #eeeeee;
`;

const Heading = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #e8d5c4;
  border-radius: 4px;
  width: 100%;
  margin-top: 5px;
  margin-bottom: 10px;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 10px;
`;

const SubmitButton = styled.button`
  background-color: green;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  margin-right: 10px;
`;

const CancelButton = styled.button`
  background-color: #a20a0a;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;
