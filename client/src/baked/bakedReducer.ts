export interface AppState {
    bakedValue: number;
    doughUsage: string;
    doughUsedValue: number;
    doughQuantity: number;
  }
  
  export interface Action {
    type: string;
    payload: string | number;
  }

const bakedReducer = (state: AppState, action: Action): AppState => {
    switch (action.type) {
        case 'SET_BAKED_VALUE': 
            return {...state, bakedValue: Number(action.payload)};
        case 'SET_DOUGH_USAGE': 
            return {...state, doughUsage: String(action.payload)};
        case 'SET_DOUGH_USED_VALUE': 
            return {...state, doughUsedValue: Number(action.payload)};
        case 'SET_DOUGH_QUANTITY': 
            return {...state, doughQuantity: Number(action.payload)};
        default:
            return state;
    }
}

export default bakedReducer;