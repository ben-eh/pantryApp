export type Ingredient = {
	id: string,
	name: string,
	category: string
}

export type IngredientMap = {
	[id: string]: Ingredient
}

// export type Category = {
// 	id: string,
// 	name: string
// }

export type IngredientQuantity = {
	id: string,
	quantity: string,
	unitOfMeasure: Measurement
}

// this type is what the user is expecting back in the recipe
export type FullIngredient = {
	id: string,
	name: string,
	category: string,
	quantity: string,
	unitOfMeasure: Measurement
}

export type Measurement = 
	'cup' |
	'tbsp' |
	'tsp' |
	'g' |
	'oz' |
	'lbs' |
	'kg' |
	'mL' |
	'L' |
	'dash' |
	'sprinkle' |
	'squeeze' |
	'pinch' |
	'can' |
	'bunch'
;

export const measurementList = ['cup', 'tbsp', 'tsp', 'g', 'oz', 'lbs', 'kg', 'mL', 'L', 'dash', 'sprinkle', 'squeeze', 'pinch', 'can', 'bunch'];