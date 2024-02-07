export interface Baked {
    id: number;
    cookie: string;
    cookie_id: number;
    size: string;
    quantity: number;
    location: string;
    location_id: number;
    date_added: string;
}

export interface AddUpdateBaked {
    cookie_id: number;
    location_id: number;
    size: string;
    quantity?: number;
}

export interface EditBaked {
    quantity?: number
}
