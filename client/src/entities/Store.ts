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
