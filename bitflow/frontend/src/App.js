import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WalletConnect from "./components/WalletConnect";
import Swap from "./components/Swap";
import Liquidity from "./components/Liquidity";
import { AppContainer, Header, MainContent } from "./styles/AppStyles";
import { GlobalStyle } from "./styles/GlobalStyles";
import styled from 'styled-components';

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 20px;
`;

const NavLink = styled.a`
  color: white;
  text-decoration: none;
  font-size: 16px;
  padding: 8px 12px;
  border-radius: 12px;
  cursor: pointer;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }

  &.active {
    background: rgba(255, 255, 255, 0.1);
  }
`;

const App = () => {
  return (
    <Router>
      <GlobalStyle />
      <AppContainer>
        <Header>
          <Nav>
            <NavLinks>
              <NavLink href="/" className={window.location.pathname === "/" ? "active" : ""}>
                Swap
              </NavLink>
              <NavLink href="/liquidity" className={window.location.pathname === "/liquidity" ? "active" : ""}>
                Liquidity
              </NavLink>
            </NavLinks>
            <WalletConnect />
          </Nav>
        </Header>
        <MainContent>
          <Routes>
            <Route path="/" element={<Swap/>} />
            <Route path="/liquidity" element={<Liquidity/>} />
          </Routes>
        </MainContent>
      </AppContainer>
    </Router>
  );
};

export default App;