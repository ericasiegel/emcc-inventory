export interface Recipe {
    id: number;
    cookie: string;
    notes: string;
    recipeingredient_set: RecipeIngredient[];
    instructions: Instructions[]
}

interface RecipeIngredient {
    id: number;
    ingredient: number;
    ingredient_name: string;
    recipe: number;
    quantity: number;
    unit: string;
}

interface Instructions {
    id: number;
    instruction: string;
    recipe: number;
}