

export interface RecipeIngredient {
    id: number;
    cookie: string;
    cookie_name: string;
    ingredient: number;
    ingredient_name: string;
    recipe: number;
    quantity: number;
    unit: string;
}

export interface Instructions {
    id: number;
    instruction: string;
    recipe: number;
}