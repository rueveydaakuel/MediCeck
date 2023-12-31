import { useState } from "react";
import Navigation from "../Navigation/index.js";
import styled from "styled-components";
import { useRouter } from "next/router.js";
import Link from "next/link";
import HeaderContainer from "../Header/index.js";
import HomepageIcon from "../HomepageIcon/index.js";

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

  const handleNextButtonClick = (event) => {
    router.push({
      pathname: "/MedicationForm",
      query: { name: name },
    });
  };

  return (
    <MainContainer>
      <div>
        <HeaderContainer />
        <main>
          <HomepageIconContainer>
            <HomepageIcon />
          </HomepageIconContainer>
          <QuestionContainer>
            <div className="question">
              <p>Für wen möchtest du einen Medikationsplan erstellen?</p>
              <Input
                type="text"
                placeholder="Name:"
                value={name}
                onChange={handleNameChange}
              />
            </div>
          </QuestionContainer>
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

const Button = styled.button`
  position: fixed;
  bottom: 100px;
  right: 30px;
  padding: 8px 16px;
  background-color: #3a98b9;
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

const MainContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Input = styled.input`
  width: 70%;
  padding: 8px;
  font-size: 16px;
`;

const HomepageIconContainer = styled.div`
  margin-bottom: 20px;
  justify-content: center;
`;

const QuestionContainer = styled.div`
  margin-right: 30px;
  padding: 20px;
  margin-bottom: 70px;
`;
