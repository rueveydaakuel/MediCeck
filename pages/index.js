import React from "react";
import styled from "styled-components";
import data from "../data.json";

const Header = styled.h1`
  border: 1px solid;
  border-radius: 8px;
  text-align: center;
  font-size: 24px;
  margin-bottom: 16px;
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
`;

const Card = styled.div`
  border: 1px solid grey;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
  max-width: 400px;
`;

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const PersonName = styled.h2`
  font-size: 20px;
  margin-bottom: 8px;
`;

const MedicationDetails = styled.div`
  font-size: 16px;
`;

const MedicationTime = styled.p`
  margin-bottom: 8px;
`;

const HomePage = () => {
  return (
    <div>
      <HeaderContainer>
        <Header>MediCheck</Header>
      </HeaderContainer>
      <CardContainer>
        {data.people.map((person, index) => (
          <Card key={index}>
            <PersonName>{person.name}</PersonName>
            <MedicationDetails>
              {person.medication.map((medication, index) => (
                <MedicationTime key={index}>
                  {medication.time}: {medication.details}
                </MedicationTime>
              ))}
            </MedicationDetails>
          </Card>
        ))}
      </CardContainer>
    </div>
  );
};

export default HomePage;
