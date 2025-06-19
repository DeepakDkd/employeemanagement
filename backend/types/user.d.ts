import { UserRole } from "../src/constants/enums/roles";

export interface IUser {
  id?: string;
  name: string;
  email: string;
  password: string;
  role?: UserRole; 
  createdAt?: Date;
  updatedAt?: Date;
}
