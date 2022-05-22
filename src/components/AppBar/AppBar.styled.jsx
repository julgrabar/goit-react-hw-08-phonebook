import styled from 'styled-components';
export const Bar = styled.header`
  background-color: #000066;
  border-bottom: 1px solid #fff;
`;

export const Nav = styled.nav`
  width: 100%;
  display: flex;

  a {
    display: inline-block;
    padding: 12px;
    color: #fff;
    margin: auto 0;
  }

  .logo {
    font-size: 24px;
    font-weight: 700;
  }
`;

export const UserBar = styled.div`
  /* margin: auto 0 auto auto; */
  margin-left: auto;
  display: flex;

  align-items: baseline;
  a {
    margin: auto 0;
  }
  button {
    margin-left: 8px;
  }
`;
