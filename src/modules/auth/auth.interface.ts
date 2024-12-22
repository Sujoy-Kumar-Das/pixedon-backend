export type ILoginUser = {
  email: string;
  password: string;
};

export interface IChangePassword {
  oldPassword: string;
  newPassword: string;
}
