require("dotenv").config();

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Navigation from "../../components/Navigation/index.js";
import { useRouter } from "next/router";
import { CloudinaryContext, Image } from "cloudinary-react";

function FormComponent() {
  const [selectedMedication, setSelectedMedication] = useState([]);
  const [selectedTime, setSelectedTime] = useState([]);
  const [medicationName, setMedicationName] = useState("");
  const [saveData, setSaveData] = useState([]);
  const router = useRouter();
  const { name } = router.query;
  const [selectedImage, setSelectedImage] = useState(null);

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

  const handleSave = async () => {
    if (
      selectedMedication.length === 0 ||
      selectedTime.length === 0 ||
      medicationName === "" ||
      name === ""
    ) {
      return;
    }

    let imageUrl = null;

    if (selectedImage) {
      imageUrl = await uploadImageToCloudinary(selectedImage);
    }

    const newData = {
      medication: selectedMedication,
      time: selectedTime,
      medicationName: medicationName,
      Person: name,
      image: imageUrl,
    };

    const savedData = JSON.parse(localStorage.getItem("medicationData")) || [];
    const updatedData = [...savedData, newData];

    if (typeof window !== "undefined") {
      localStorage.setItem("medicationData", JSON.stringify(updatedData));
    }

    setSaveData(updatedData);
    setSelectedMedication([]);
    setSelectedTime([]);
    setMedicationName("");

    router.push({
      pathname: "/overview",
      query: { medicationData: JSON.stringify(updatedData) },
    });
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setSelectedImage(reader.result);
    };

    reader.readAsDataURL(file);
  };

  // const uploadImageToCloudinary = async (file) => {
  //   try {
  //     const formData = new FormData();
  //     formData.append("file", file);
  //     formData.append("upload_preset", "medication_images");

  //     const response = await axios.post(
  //       `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
  //       formData
  //     );

  //     return response.data.secure_url;
  //   } catch (error) {
  //     console.error("Error uploading image to Cloudinary:", error);
  //     return null;
  //   }
  // };

  const uploadImageToCloudinary = async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "medication_images");

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/dfvh9qexq/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (response.ok) {
        return data.secure_url;
      } else {
        throw new Error("Fehler beim Hochladen des Bildes zu Cloudinary");
      }
    } catch (error) {
      console.error("Fehler beim Hochladen des Bildes zu Cloudinary:", error);
      return null;
    }
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
      <QuestionContainer>
        <h2>Füge ein Bild hinzu (optional)</h2>
        <Input type="file" accept="image/*" onChange={handleImageChange} />
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
  background-color: ${(props) => (props.selected ? "#3A98B9" : "#E8D5C4")};
  color: ${(props) => (props.selected ? "white" : "black")};
  padding: 10px;
  margin: 5px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  flex: 0 0 auto;
  margin-bottom: 5px;
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
  border-radius: 8px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 50px;

  button {
    background-color: green;
    color: white;
    padding: 10px;
    border-radius: 4px;
    border: none;
    border-radius: 4px;
    margin-right: 10px;
    width: 100px;
  }
`;

const QuestionContainer = styled.div`
  text-align: center;
`;
