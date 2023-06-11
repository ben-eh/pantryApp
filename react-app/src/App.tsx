import { Typography, Paper, TextField, Button, Divider } from '@mui/material';
import { useState } from 'react';
import styled from 'styled-components';

const Layout = styled.div`
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;
const Header = styled.header`
  background-color: lightskyblue;
  padding: 1rem 3rem;
  display: flex;
  align-items: center;
`;
const Body = styled.main`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-top: 3rem;
`;
const Form = styled(Paper)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 2rem;
`;
const Title = styled.h2`
  text-align: center;
  margin-bottom: 1rem;
`;


function App() {

  const [username, setUsername] = useState<string>();
  const [password, setPassword] = useState<string>();

  return (
    <Layout>
      <Header>
        <Typography variant='h4'>
          Pantry App
        </Typography>
      </Header>
      <Body>
        <Form elevation={5}>
          <Title>
            Login
          </Title>
          <TextField 
            placeholder='Username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{
              marginBottom: '1rem',
            }}
          />
          <TextField 
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              marginBottom: '1rem',
            }}
          />
          <Button
            variant='contained'>
            Login
          </Button>
        </Form>
      </Body>
    </Layout>
  );
}

export default App;
