import React, { useState, useEffect } from "react";
import Lottie from "react-lottie";
import { FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";

import {
  ContentTitle,
  Title,
  ContainerCustom,
  ContentBox,
  ContentSearchBox,
} from "./styles";
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
