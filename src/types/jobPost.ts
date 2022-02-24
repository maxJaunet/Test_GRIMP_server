import { Document } from 'mongoose';

export interface IJobPost extends Document{
  _id: string | number,
  coverImage: string,
  companyLogo: string,  
  companyName: string,
  title: string,
  content: string,
  contractType: string,
  localization: string,
  publishedAt: string
}