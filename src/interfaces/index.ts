export interface IUser {
    id: number;
    login: string;
    password: string;
}

export interface IAuthState {
  user: any; 
  token: string | null;
  loading: boolean;
  error: string;
}

export interface IAction {
  type: string;
  payload?: any;
}

export interface IRegisterState {
  loading: boolean,
  userInfo: any | null,
  error: string | null
}

export interface IProject {
  title:string;
  description:string;
}

