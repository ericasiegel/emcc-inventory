export interface StartingState {
    cookieValue: number;
    selectedStoredUsage: string;
    storedUsageValue: number;
    storedQuantity: number;
}

export interface Action {
    type: string;
    payload: number | string;
}

const addUpdateFormReducer = (state: StartingState, action: Action): StartingState => {
    switch (action.type) {
        case 'set_cookie_value':
            return {...state, cookieValue: Number(action.payload)};
        case 'set_selected_stored_usage':
            return {...state, selectedStoredUsage: String(action.payload)};
        case 'set_stored_usage_value':
            return {...state, storedUsageValue: Number(action.payload)};
        case 'set_stored_Quantity':
            return {...state, storedQuantity: Number(action.payload)};
        default:
            return state;
    }
}

export default addUpdateFormReducer;