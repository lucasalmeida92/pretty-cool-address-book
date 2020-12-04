import styled from 'styled-components';

const Container = styled.footer`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 0;
  padding: 8px 16px;

  &:before {
    content: '';
    position: absolute;
    width: 90%;
    height: 1px;
    background-color: #eee;
    top: 0;
  }
`;

const Rights = styled.p`
  font-weight: 100;
  color: #999;
`;

const Footer = () => (
  <Container>
    <Rights>Pretty Cool Address Book - All rights reserved {new Date().getFullYear()}</Rights>
  </Container>
)

export default Footer;
