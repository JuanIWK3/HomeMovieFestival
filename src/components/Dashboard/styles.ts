import styled from "styled-components";
import { rotate } from "../../style/animations";

export const Spinner = styled.div`
  height: 150px;
  width: 150px;
  background-image: url(https://i0.wp.com/www.primefaces.org/wp-content/uploads/2017/09/feature-react.png?ssl=1);
  background-position: center;
  background-size: cover;
  border-radius: 50%;
  position: relative;
  animation: ${rotate} 1s linear infinite;
`;

export const MoviesContainer = styled.div`
  .movies-header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .button {
    }
  }
`;

export const Container = styled.div`
  width: 100%;
  max-width: 1000px;

  .user-tab {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;

    .user-image-and-name {
      display: flex;
      align-items: center;
    }
  }
`;

export const PreviewWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Preview = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  img {
    height: 150px;
    width: 150px;
    border-radius: 50%;
  }
`;

export const Buttons = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  .dropdown {
    width: 100%;
    button {
      display: flex;
      align-items: center;
      justify-content: center;

      p {
        margin: 0 8px;
        padding: 0;
      }
    }
  }
  button {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 8px;
    width: 100%;

    p {
      margin: 0 8px;
    }
  }
`;

export const Image = styled.div`
  background-image: ${(props: { src: string }) => props.src};
  background-size: cover;
  background-position: center;

  width: 150px;
  height: 150px;
  border-radius: 50%;
  margin-right: 16px;

  cursor: pointer;
`;
