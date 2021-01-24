import React from "react";
import Container from "@material-ui/core/Container";
import Lottie from "react-lottie";
import { ContentTitle,Title } from "./styles";
import animationData from "../../asserts/animations/github.json";
export default function HomePage() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
  };

  return (
    <Container>
      <ContentTitle>
        <Lottie options={defaultOptions} height={200} width={200} />
        <Title>Git Repositories</Title>
      </ContentTitle>
    </Container>
  );
}
