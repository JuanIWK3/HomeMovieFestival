import { keyframes } from "styled-components";
export const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const slideInRight = keyframes`
  from {
    transform: translateX(2000px) scale(0.2);
  }
  to {
    transform: translateX(0px) scale(1);
  }
`;
