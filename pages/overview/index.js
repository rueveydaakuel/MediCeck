import { useEffect, useState } from "react";
import Navigation from "../../components/Navigation";
import styled from "styled-components";

const weekdays = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];
const timesOfDay = ["morgens", "mittags", "abends"];

export default function Overview() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("medicationData")) || [];
    setData(savedData.reverse());
  }, []);

  return (
    <Container>
      <h1>Übersicht</h1>
      {data.length > 0 ? (
        data.map((item, index) => (
          <Card key={index}>
            <h2>Person: {item.Person}</h2>
            <p>Tag: {item.medication.map((day) => weekdays[day]).join(", ")}</p>
            <p>
              Tageszeit: {item.time.map((time) => timesOfDay[time]).join(", ")}
            </p>
            <p>Medikament: {item.medicationName}</p>
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
