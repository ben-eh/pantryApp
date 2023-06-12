import { Typography, TextField, Button, Paper, Box } from "@mui/material";
import { useEffect, useState } from "react";
import styled from 'styled-components';
import SearchBar from "../components/SearchBar";
import Page from "./Page";
import axios from "axios";

const data = [
  { key: 'a', value: 'a' },
  { key: 'b', value: 'b' },
  { key: 'c', value: 'c' },
];

const Container = styled(Paper)`
  width: 500px;
  padding: 2rem;
`;

const MyRecipes = () => {

  const [recipes, setRecipes] = useState<any>();
  const [selectedRecipe, setSelectedRecipe] = useState<any>();

  useEffect(() => {
    loadRecipes();
  });

  const loadRecipes = async () => {
    try {
        const options = {
            headers: {
              'Content-Type': 'application/json'
            },
        }
        const request = await axios.get('http://localhost:3001/recipes', options);
        setRecipes(request.data);
    }catch (error) {
        alert('Could not get recipes');
    }
  }

  const convertRecipesToData = (): any[] => {
    if (!recipes) return [];
    return Object.values(recipes).map((recipe: any) => {
      return {
        key: recipe.id,
        value: recipe.name,
      };
    });
  }

  const loadSelectedRecipe = async (id: string) => {
    try {
        const options = {
            headers: {
              'Content-Type': 'application/json'
            },
        }
        const request = await axios.get(`http://localhost:3001/recipes/${id}`, options);
        setSelectedRecipe(request.data);
        console.log(request.data);
    }catch (error) {
        alert('Could not get recipe');
    }
  }

    return (
      <Page>
        <Container>
          <Typography variant="h5">
            Search for a recipe!
          </Typography>
          <SearchBar 
            data={convertRecipesToData()}
            onSelect={(selection: any) => loadSelectedRecipe(selection.item.key)}
          />
          {selectedRecipe && (
          <Paper style={{ marginTop: '3rem', }}>
            <Typography variant="h4">{selectedRecipe.name}</Typography>
            <Typography variant="h6" style={{ marginTop: '1rem', }}>Ingredients</Typography>
            {selectedRecipe.ingredients.map((ingredient: any) => {
              return (
                <Box>
                  <Typography>
                    {`${ingredient.name} - ${ingredient.quantity} ${ingredient.unitOfMeasure}`}
                  </Typography>
                </Box>
              );
            })}
            <Typography variant="h6" style={{ marginTop: '1rem', }}>Steps</Typography>
            {selectedRecipe.steps.map((step: any, i: number) => {
              return (
                <Box>
                  <Typography>
                    {`${i}. ${step}`}
                  </Typography>
                </Box>
              );
            })}
          </Paper>
          )}
        </Container>
      </Page>
    );
}

export default MyRecipes;