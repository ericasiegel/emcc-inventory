export interface Baked {
    id: number;
    cookie: string;
    cookie_id: number;
    size: string;
    quantity?: number;
    location: string;
    location_id: number;
    date_added: string;
}

export interface EditBaked {
    quantity?: number
}
