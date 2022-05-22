import styled from 'styled-components';
import { createGlobalStyle } from 'styled-components';

export const Global = createGlobalStyle`
    *{
        box-sizing: border-box;
    }

    body{
        
        background-color: #000066;
        color: #ffffff
    }

    input{
        padding: 5px 10px;
        border: none;
        border-radius: 5px;
    }

    .filter{
        width: 100%;
    }

`;

export const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
