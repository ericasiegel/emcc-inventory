
export interface Dough {
    id: number;
    cookie: string;
    cookie_id: number;
    quantity?: number;
    location: string;
    location_id: number;
    date_added: string;
}

export interface EditDough {
    quantity?: number
}