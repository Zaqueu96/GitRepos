import React from "react";
import Lottie from "react-lottie";
import { ContentTitle, Title, ContainerCustom, ContentBox } from "./styles";
import animationData from "../../asserts/animations/github.json";
import TableRepo from "../../components/TableRepository";
export default function HomePage() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
  };

  return (
    <ContainerCustom>
      <ContentTitle>
        <Lottie options={defaultOptions} height={200} width={200} />
        <Title>Git Repositories</Title>
      </ContentTitle>
      <ContentBox>
        <TableRepo />
      </ContentBox>
    </ContainerCustom>
  );
}
