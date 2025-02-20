import styled from 'styled-components';

export const ConnectButton = styled.button`
  background: rgb(76, 130, 251);
  color: white;
  border: none;
  border-radius: 20px;
  padding: 12px 24px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: rgb(56, 110, 231);
  }
`;

export const WalletAddress = styled.div`
  background: rgba(255, 255, 255, 0.1);
  padding: 12px 24px;
  border-radius: 20px;
  color: white;
  font-size: 16px;
  cursor: pointer;
  
  &:hover {
    background: rgba(255, 255, 255, 0.15);
  }
`; 