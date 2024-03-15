export interface Store {
    id: number;
    cookie: string;
    cookie_id: number;
    size: string;
    quantity?: number;
    last_updated: string;
    updated_by: {
        username: string;
    };  
}

export interface AddEditStore {
    cookie_id: number;
    size: string;
    quantity?: number;
}

export interface EditStore {
    quantity?: number;
}

