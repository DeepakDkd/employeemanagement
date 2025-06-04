export interface IUser {
  id?: number;
  name: string;
  email: string;
  password: string;
  role?: 'user' | 'admin'; // Default role is 'user'
  createdAt?: Date;
  updatedAt?: Date;
}
