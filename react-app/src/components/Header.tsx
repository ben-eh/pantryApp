import { Typography } from "@mui/material";
import { styled } from "styled-components";


const Container = styled.header`
  background-color: lightskyblue;
  padding: 1rem 3rem;
  display: flex;
  align-items: center;
`;

const Header = () => {
    return (
        <Container>
            <Typography variant='h4'>
                Pantry App
            </Typography>
        </Container>
    );
}

export default Header;