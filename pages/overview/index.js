import { useEffect, useState } from "react";
import Navigation from "../../components/Navigation";
import styled from "styled-components";
import EditForm from "../editForm";

const weekdays = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];
const timesOfDay = ["morgens", "mittags", "abends"];

export default function Overview() {
  const [data, setData] = useState([]);
  const [selectedIndices, setSelectedIndices] = useState([]);

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("medicationData")) || [];
    setData(savedData.reverse());
  }, []);

  const handleEdit = (index) => {
    if (selectedIndices.includes(index)) {
      setSelectedIndices((prevIndices) =>
        prevIndices.filter((i) => i !== index)
      );
    } else {
      setSelectedIndices((prevIndices) => [...prevIndices, index]);
    }
  };

  const handleSave = (editedItem, index) => {
    const updatedData = [...data];
    updatedData[index] = editedItem;
    setData(updatedData);
    setSelectedIndices([]);

    localStorage.setItem("medicationData", JSON.stringify(updatedData));
  };

  return (
    <Container>
      <h1>Übersicht</h1>
      {data.length > 0 ? (
        data.map((item, index) => (
          <Card key={index}>
            {selectedIndices.includes(index) ? (
              <EditForm
                item={item}
                onSave={(editedItem) => handleSave(editedItem, index)}
                onCancel={() => handleEdit(index)}
              />
            ) : (
              <>
                <h2>Person: {item.Person}</h2>
                <p>
                  Tag: {item.medication.map((day) => weekdays[day]).join(", ")}
                </p>
                <p>
                  Tageszeit:
                  {item.time.map((time) => timesOfDay[time]).join(", ")}
                </p>
                <p>Medikament: {item.medicationName}</p>
                <button onClick={() => handleEdit(index)}>Bearbeiten</button>
              </>
            )}
          </Card>
        ))
      ) : (
        <p>Keine Daten vorhanden.</p>
      )}
      <Navigation />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding-bottom: 50px;
`;

const Card = styled.div`
  border: 1px solid black;
  padding: 10px;
  margin: 10px;
  width: 50%;
`;
