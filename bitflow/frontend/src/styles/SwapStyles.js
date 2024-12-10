import styled from 'styled-components';

export const SwapContainer = styled.div`
  max-width: 480px;
  width: 100%;
  padding: 16px;
  background: rgb(13, 17, 28);
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0px 10px 24px rgba(0, 0, 0, 0.2);
`;

export const SwapHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  padding: 8px;
`;

export const SwapTitle = styled.h2`
  color: #FFFFFF;
  font-size: 16px;
  font-weight: 500;
`;

export const TokenInput = styled.div`
  background: rgba(13, 17, 28, 0.7);
  border-radius: 20px;
  padding: 16px;
  margin-bottom: 4px;
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

export const InputRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Input = styled.input`
  background: none;
  border: none;
  color: #FFFFFF;
  font-size: 24px;
  outline: none;
  width: 100%;
  &::placeholder {
    color: #5D6785;
  }
`;

export const TokenSelect = styled.button`
  background: #191B1F;
  border: 1px solid #40444F;
  border-radius: 16px;
  padding: 8px 12px;
  color: #FFFFFF;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  &:hover {
    background: #2C2F36;
  }
`;

export const TokenLogo = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  margin-right: 8px;
  
  ${props => props.as === 'img' && `
    object-fit: cover;
  `}
`;

export const SwapButton = styled.button`
  width: 100%;
  background: ${props => props.disabled ? 'rgba(255, 255, 255, 0.1)' : 'rgb(76, 130, 251)'};
  color: white;
  border: none;
  border-radius: 20px;
  padding: 16px;
  font-size: 16px;
  font-weight: 600;
  margin-top: 8px;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  transition: background 0.2s;

  &:hover {
    background: ${props => props.disabled ? 'rgba(255, 255, 255, 0.1)' : 'rgb(56, 110, 231)'};
  }
`;

export const SwitchButton = styled.button`
  background: #191B1F;
  border: 4px solid #2C2F36;
  border-radius: 12px;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: -8px auto;
  position: relative;
  z-index: 2;
  cursor: pointer;
  &:hover {
    background: #2C2F36;
  }
`;
