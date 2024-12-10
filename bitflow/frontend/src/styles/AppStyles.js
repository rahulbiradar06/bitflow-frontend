import styled from 'styled-components';

export const AppContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(rgb(13, 17, 28) 0%, rgb(23, 21, 34) 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

export const Header = styled.div`
  width: 100%;
  max-width: 1200px;
  display: flex;
  justify-content: flex-end;
  margin-bottom: 30px;
`;

export const MainContent = styled.main`
  width: 100%;
  max-width: 480px;
  margin: 60px auto;
`;