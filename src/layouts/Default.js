import styled from 'styled-components';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const PageContainer = styled.section`
  flex: 1;
  width: 100%;
  max-width: 760px;
  margin: 0 auto;
  padding: 16px 16px 32px;
`;

const Default = ({ children }) => (
  <Wrapper>
    <Header />
    <PageContainer>
      { children }
    </PageContainer>
    <Footer>All rights reserved {new Date().getFullYear()}</Footer>
  </Wrapper>
)

export default Default;
