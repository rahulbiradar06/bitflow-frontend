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

export const CardWrapper = styled.div`
  background: rgba(13, 17, 28, 0.85);
  border-radius: 24px;
  padding: 24px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  max-width: 480px;
  width: 100%;
  margin: 20px auto;
`;

export const ArrowWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 12px;
  margin: -8px 0;
  z-index: 1;
`;

export const ArrowButton = styled.button`
  background: rgba(13, 17, 28, 0.9);
  border: 4px solid rgba(21, 26, 47, 0.9);
  border-radius: 12px;
  height: 40px;
  width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #fff;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.1);
  }
`;

export const TokenInputWrapper = styled(TokenInput)`
  background: rgba(13, 17, 28, 0.7);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 16px;
  margin: 8px 0;
  transition: border-color 0.2s;

  &:hover {
    border-color: rgba(255, 255, 255, 0.2);
  }
`;

export const EnhancedTokenSelect = styled(TokenSelect)`
  background: rgba(21, 26, 47, 0.9);
  border-radius: 16px;
  padding: 8px 16px;
  transition: background 0.2s;

  &:hover {
    background: rgba(30, 36, 60, 0.9);
  }
`;

export const EnhancedSwapButton = styled(SwapButton)`
  background: linear-gradient(45deg, #3498db, #2980b9);
  border-radius: 20px;
  height: 56px;
  font-size: 18px;
  font-weight: 600;
  transition: transform 0.2s;
  margin-top: 20px;

  &:not(:disabled):hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(52, 152, 219, 0.3);
  }

  &:disabled {
    background: linear-gradient(45deg, #95a5a6, #7f8c8d);
    cursor: not-allowed;
  }
`;
