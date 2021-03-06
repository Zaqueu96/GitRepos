import styled from "styled-components";

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

export const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ContentAnimation = styled.div`
  position: absolute;
  top: calc(50% - 4em);
  left: calc(50% - 4em);
  width: 6em;
  height: 6em;
  border: 1.1em solid rgba(0, 0, 0, 0.2);
  border-left: 1.1em solid #000000;
  border-radius: 50%;
  animation: load8 1.1s infinite linear;
  transition: opacity 0.3s;
  @keyframes load8 {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
  
`;
