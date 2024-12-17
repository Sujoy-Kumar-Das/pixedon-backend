import { IService } from './service.type';

export interface IEmail {
  name: string;
  email: string;
  projectDetails: string;
  service: IService;
  serviceType: 'free' | 'premium';
  confirm?: boolean;
}
