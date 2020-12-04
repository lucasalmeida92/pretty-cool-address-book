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
  margin: 0;

  a {
    display: flex;
    align-items: center;
    font-weight: 900;
    font-size: 20px;
    color: #333;
  }
`;

const Logo = styled.img`
  height: 33px;
  margin-right: 16px;
`;

const Header = () => (
  <Container>
    <Title>
      <a href="/" title="Pretty Cool Address Book">
        <Logo src={logo} alt="Logo" />
        <span>Pretty Cool Address Book</span>
      </a>
    </Title>
  </Container>
)

export default Header;
