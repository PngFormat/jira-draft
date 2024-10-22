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

export interface CreateProjectProps {
  handleCreate: (title: string, description: string) => void;
}

export interface ProjectPageProps {
  projects: IProject[];  
}

export interface Project {
  title:string,
  description:string,
}

export interface ProjectState {
  projects: Project[];
  loading: boolean,
  error: string | null;
}

export const initialState: ProjectState = {
  projects: [],
  loading: false,
  error: null,
}


