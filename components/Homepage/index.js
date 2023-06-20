import { useState } from "react";

export default function Homepage() {
  const [name, setName] = useState("");
  const [isButtonDeactivated, setIsButtonDeactivated] = useState(true);

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
    console.log(`Medikationsplan wird für ${name} erstellt.`);
  };

  return (
    <div>
      <header>
        <h1>MediCheck</h1>
      </header>
      <main>
        <div className="question">
          <p>Für wen möchtest du einen Medikationsplan erstellen?</p>
          <input
            type="text"
            placeholder="Name:"
            value={name}
            onChange={handleNameChange}
          />
        </div>
        <button disabled={isButtonDeactivated} onClick={handleNextButtonClick}>
          Weiter
        </button>
      </main>
    </div>
  );
}
