import { styled } from "styled-components";
import Header from "../components/Header";

const Layout = styled.div`
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;
const Body = styled.main`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-top: 3rem;
`;

const Page = ({ children }: any) => {
    return (
        <Layout>
            <Header />
            <Body>{children}</Body>
        </Layout>
    );
}

export default Page;