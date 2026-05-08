import { USER } from '../action/ActionTypes';

interface User {
  uid: string;
  email: string | null;
  profileComplete: boolean;
  createdAt: string; // ISO string format for serialization
}

interface AppState {
  user: User | null;
}

const initialState: AppState = {
  user: null,
};

const appReducer = (state = initialState, action: any): AppState => {
  switch (action.type) {
    case USER:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};

export default appReducer;