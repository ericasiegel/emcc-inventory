
export interface Dough {
    id: number;
    cookie: string;
    quantity: number;
    location: string;
    date_added: string;
}

export interface AddUpdateDough {
    cookie_name: number;
    location_name: number;
    quantity?: number;
}
