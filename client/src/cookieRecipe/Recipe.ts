
export interface Ingredient {
    id: number;
    name: string;
}

export interface Ingredients {
    id: number;
    cookie: string;
    cookie_id: number;
    ingredient: string;
    ingredient_id: number;
    quantity: number;
    unit: string;
}

export interface AddUpdateCookieIngredients {
    cookie_id: number;
    ingredient_id: number;
    quantity: number;
    unit: string;
}

export interface Instructions {
    id: number;
    cookie: string;
    cookie_id: number;
    instruction: string;
}