export interface Baked {
    id: number;
    cookie: string;
    size: string;
    quantity: number;
    location: string;
    date_added: string;
}

export interface AddUpdateBaked {
    cookie_name: number;
    location_name: number;
    size: string;
    quantity?: number;
}
