import styled from 'styled-components';

const Button = styled.button`
  margin: 10px;
  padding: 8px 16px;
  min-width: ${({ small }) => small ? 'auto': '120px'};
  height: ${({ small }) => small ? '33px': '56px'};
  text-align: center;
  text-transform: uppercase;
  transition: 0.5s;
  background-size: 200% auto;
  color: white;
  font-weight: 700;
  letter-spacing: 2px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  border: 0;
  border-radius: 56px;
  background-image: linear-gradient(to right, #f6d365 0%, #fda085 51%, #f6d365 100%);
  cursor: pointer;
  outline: none;

  &:hover {
    background-position: right center;
    box-shadow: 0 4px 16px rgba(0,0,0,0.1);
    transform: translateY(-1px);
  }

  &:active {
    transition: 0s;
    background-position: right center;
    box-shadow: 0 2px 2px rgba(0,0,0,0.1);
    transform: translateY(0);
  }
`;

export default Button;
