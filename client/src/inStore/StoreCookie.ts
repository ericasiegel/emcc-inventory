export interface Store {
    id: number;
    cookie: string;
    size: string;
    quantity: number;
    last_updated: string;
    updated_by: {
        username: string;
    };  
}

export interface AddStore {
    cookie_name: number;
    size: string;
    quantity?: number;
}

export interface EditStore {
    quantity?: number;
}

