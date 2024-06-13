import React from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 50px;
  height : 14vh;
  background-color: white;
`;

const Logo = styled.div`
  font-size: 2.3em;
//font-weight: bold;
  color: #0d0d0d;

`;

const ContactButton = styled.button`
  background-color: #4b0dff;
  color: white;
  border: none;
  border-radius: 25px;
  padding: 12px 22px;
  cursor: pointer;
  font-size: 1em;
  &:hover {
    background-color: #3700ff;
  }
`;

const Header = () => {
  return (
    <HeaderContainer>
      
        <Logo>
         ChatPDF
        </Logo>
      <ContactButton>About Me</ContactButton>
    </HeaderContainer>
  );
};

export default Header;
