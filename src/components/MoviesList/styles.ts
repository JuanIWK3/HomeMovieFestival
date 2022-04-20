import styled, { keyframes } from "styled-components";
import { rotate, rotateInv } from "../../style/animations";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  .movie {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 24px;
    max-width: 600px;

    .description {
      text-align: center;
    }

    .delete-icon {
      background: red;
      height: 40px;
      width: 40px;
      border-radius: 0.3rem;
      padding: 4px;
      margin-top: 16px;
    }
  }
`;

export const Spinner = styled.div`
  height: 30px;
  width: 30px;
  background: conic-gradient(#111 60%, #fff);
  border-radius: 50%;
  position: relative;
  animation: ${rotate} 1s linear infinite;

  &::before {
    content: "";
    height: 26px;
    width: 26px;
    background-color: #111;
    position: absolute;
    border-radius: 50%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

export const Loading = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
`;

export const Image = styled.div`
  background-image: ${(props: { src: string }) => props.src};
  background-position: center;
  background-size: contain;
  height: 150px;
  width: 150px;
  margin: 8px;
`;
