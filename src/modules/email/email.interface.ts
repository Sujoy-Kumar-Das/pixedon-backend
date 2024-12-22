export enum IService {
  WD = 'WD',
  GD = 'GD',
  DM = 'DM',
  DE = 'DE',
  EC = 'EC',
}

export interface IEmail {
  name: string;
  email: string;
  projectDetails: string;
  service: IService;
  serviceType: 'free' | 'premium';
  confirm?: boolean;
}
