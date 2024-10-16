import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE,LOGOUT } from './authActions';

interface AuthState {
  user: any; 
  token: string | null;
  loading: boolean;
  error: string;
}

interface Action {
  type: string;
  payload?: any;
}

const initialState: AuthState = {
  token:null,
  user:null,
  loading: false,
  error: '',
};

const authReducer = (state = initialState, action: Action): AuthState => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return { ...state, loading: true, error: '' };
    case LOGIN_SUCCESS:
      return { ...state, user: action.payload.user,token: action.payload.token, loading: false, error: '' };
    case LOGIN_FAILURE:
      return { ...state, loading: false, error: action.payload }; 
    case LOGOUT: 
      return {user: null,token: null,loading:false, error: ''}
    default:
      return state;
  }
};

export default authReducer;
