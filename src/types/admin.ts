import { Document } from 'mongoose';

export interface IAdmin extends Document{
  _id: string | number,
  email: string,
  password: string
}