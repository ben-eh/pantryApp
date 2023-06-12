import { TextField, Button, Paper } from "@mui/material";
import { useState } from "react";
import styled from 'styled-components';
import useAuth from "../hooks/useAuth";
import Page from "./Page";
import { Link } from "react-router-dom";

const Form = styled(Paper)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 2rem;
  min-width: 300px;
`;
const Title = styled.h2`
  text-align: center;
  margin-bottom: 1rem;
`;
const LinkContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;


const Login = () => {
  const { login } = useAuth();
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleLoginClick = () => {
    if (username && password) {
      login({ username, password });
    }
  }

  return (
    <Page>
      <Form elevation={5}>
        <Title>
          Login
        </Title>
        <TextField
          fullWidth
          placeholder='Username'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{
            marginBottom: '1rem',
          }}
        />
        <TextField
          fullWidth
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            marginBottom: '1rem',
          }}
        />
        <Button
          fullWidth
          variant='contained'
          onClick={handleLoginClick}
          style={{
            marginBottom: '1rem',
          }}>
          Login
        </Button>
        <LinkContainer>
          <Link to='/register'>Forgor Password?</Link>
          <Link to='/register'>Register</Link>
        </LinkContainer>
      </Form>
    </Page>
  );
}

export default Login;