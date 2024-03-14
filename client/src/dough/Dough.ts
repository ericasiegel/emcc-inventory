
export interface Dough {
    id: number;
    cookie: string;
    cookie_id: number;
    quantity?: number;
    location: string;
    location_id: number;
    date_added: string;
}

export interface AddUpdateDough {
    cookie_id: number;
    location_id: number;
    quantity?: number;
}

export interface EditDough {
    quantity?: number
}