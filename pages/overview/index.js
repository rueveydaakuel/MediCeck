import { useEffect, useState } from "react";
import Navigation from "../../components/Navigation";
import styled from "styled-components";
import EditForm from "../editForm";
import Head from "next/head";

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
      <Heading>Übersicht</Heading>
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
                <PersonName>Person: {item.Person}</PersonName>
                <Information>
                  Tag: {item.medication.map((day) => weekdays[day]).join(", ")}
                </Information>
                <Information>
                  Tageszeit:
                  {item.time.map((time) => timesOfDay[time]).join(", ")}
                </Information>
                <Information>Medikament: {item.medicationName}</Information>
                <EditButton>
                  <EditButtonText onClick={() => handleEdit(index)}>
                    Bearbeiten
                  </EditButtonText>
                </EditButton>
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
  border: 1px solid #e8d5c4;
  padding: 10px;
  margin: 10px;
  width: 100%;
  border-radius: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f0ece3;
`;
const EditButton = styled.button`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  align-items: center;
  height: 100%;
  background-color: #3a98b9;
  border: none;
  border-radius: 8px;
`;

const PersonName = styled.h2`
  color: #1b6b93;
  font-family: Arial, sans-serif;
`;

const Information = styled.p`
  color: #3a98b9;
  font-family: Arial, sans-serif;
`;

const EditButtonText = styled.span`
  color: white;
  font-weight: bold;
  font-size: 16px;
  padding: 8px 16px;
`;

const Heading = styled.h2`
  font-size: 32px;
  color: #1d4c5c;
  font-weight: bold;
  margin-bottom: 20px;
  text-align: center;
`;
