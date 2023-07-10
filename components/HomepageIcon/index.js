import React from "react";
import styled from "styled-components";
import Image from "next/image";
import MedicinIcon from "../../public/pngwing1.com.png";

export default function HomepageIcon() {
  return (
    <IconContainer>
      <SytledImage src={MedicinIcon} alt="MedicinIcon" />
    </IconContainer>
  );
}

const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  margin-bottom: 20px;
`;

const SytledImage = styled(Image)`
  width: 140px;
  height: 120px;
`;
