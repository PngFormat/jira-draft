export type TUserRole = 'ADMIN' | 'USER';


export interface IUser {
  id: number;
  name: string;
  email: string;
  role: TUserRole;
  avatar?: string;
}

export interface IAuthState {
  user: IUser | null; 
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
  userInfo: IUser | null;
  error: string | null
}

export interface IProject {
  title:string;
  description:string;
  id?: number;
  onClick?: () => void
  users?: IUser[];
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
  projects: IProject[];
  loading: boolean,
  error: string | null;
}

export const initialState: ProjectState = {
  projects: [],
  loading: false,
  error: null,
}

export interface IStatus {
  id: number;
  title: string;
  color: string;
}


export interface ITask {
  id: number;
  title: string;
  description: string;
  timeTracked: number;
  timeAllotted: number;
  projectId: number;
  statusId: number;
  typeId: number;
  userId: number;
  status: IStatus;
  user: IUser;
  files: IFile[];
  type: IType;
  onClick?: () => void

}

export interface IType {
  id: number;
  title: string;
  color: string;
}

export interface IFile {
  id: number;
  commentId?: number;
  taskId?: number;
  name: string;
  file?: File;

}

export interface IComment {
  id: number;
  message: string;
  taskId: number;
  userId: number;
  user: IUser;
  files: IFile[];
}

