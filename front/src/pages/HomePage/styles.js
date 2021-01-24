import styled from "styled-components";
import { Container } from "@material-ui/core";

export const ContainerCustom = styled(Container)`
  padding: 5%;
`;
export const ContentTitle = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

export const Title = styled.text`
  font-size: 32px;
  text-align: center;
`;

export const ContentBox = styled.div``;

export const ContentSearchBox = styled.div`
  width: 30%;
  min-width: 250px;
  display: flex;
  align-self: center;
  padding: 10px;
  .MuiAutocomplete-root {
    width: 100% !important;
  }
`;
