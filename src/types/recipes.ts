import { Ingredient } from "./ingredients"

export type Recipe = {
	id: string,
	name: string,
	steps: string[],
	ingredients: string[],
	// cuisine: string (ex. 'chinese', 'mexican', 'french'),
	// time: (ex. '<10m', '10-30m')
}

export type RecipeMap = {
	[id: string]: Recipe
}