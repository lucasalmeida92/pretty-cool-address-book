import styled from 'styled-components';
import logo from '../assets/logo.png';

const Container = styled.header`
  display: flex;
  align-items: center;
  flex: 0;
  flex-basis: 64px;
  padding: 0 24px;
  background-color: #f8f8f8;
`;

const Title = styled.h1`
  display: flex;
  align-items: center;
  font-weight: 900;
  font-size: 20px;
  margin: 0;
`;

const Logo = styled.img`
  height: 33px;
  margin-right: 16px;
`;

const Header = () => (
  <Container>
    <Title>
      <Logo src={logo} alt="Logo" />
      <span>Pretty Cool Address Book</span>
    </Title>
  </Container>
)

export default Header;
