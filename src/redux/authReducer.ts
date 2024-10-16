import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE } from './authActions';

interface AuthState {
  user: any; 
  loading: boolean;
  error: string;
}

interface Action {
  type: string;
  payload?: any;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: '',
};

const authReducer = (state = initialState, action: Action): AuthState => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return { ...state, loading: true, error: '' };
    case LOGIN_SUCCESS:
      return { ...state, user: action.payload, loading: false, error: '' };
    case LOGIN_FAILURE:
      return { ...state, loading: false, error: action.payload }; 
    default:
      return state;
  }
};

export default authReducer;
