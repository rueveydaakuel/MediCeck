import { useState } from "react";
import Navigation from "../Navigation/index.js";
import styled from "styled-components";
import { useRouter } from "next/router.js";
import Link from "next/link";
import MedicationForm from "../../pages/MedicationForm/index.js";

export default function Homepage() {
  const [name, setName] = useState("");
  const [isButtonDeactivated, setIsButtonDeactivated] = useState(true);
  const router = useRouter();

  const handleNameChange = (event) => {
    const newName = event.target.value;
    setName(newName);

    if (newName.trim() !== "") {
      setIsButtonDeactivated(false);
    } else {
      setIsButtonDeactivated(true);
    }
  };

  const handleNextButtonClick = () => {
    router.push("/MedicationForm");
  };

  return (
    <MainContainer>
      <div>
        <HeaderContainer>
          <header>
            <h1>MediCheck</h1>
          </header>
        </HeaderContainer>
        <main>
          <div className="question">
            <p>Für wen möchtest du einen Medikationsplan erstellen?</p>
            <Input
              type="text"
              placeholder="Name:"
              value={name}
              onChange={handleNameChange}
            />
          </div>
          <Button
            disabled={isButtonDeactivated}
            onClick={handleNextButtonClick}
          >
            Weiter
          </Button>
        </main>
        <footer>
          <Navigation />
        </footer>
      </div>
    </MainContainer>
  );
}

const HeaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const Button = styled.button`
  position: fixed;
  bottom: 100px;
  right: 30px;
  padding: 8px 16px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const MainContainer = styled.main`
  padding-bottom: 60px; /* Platz für den Button reservieren */
`;

const Input = styled.input`
  width: 50%;
  padding: 8px;
  font-size: 16px;
`;
