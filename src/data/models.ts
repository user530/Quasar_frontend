export const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z\d\s\n])(?!.*[\s\n]).{6,}$/;

export interface Todo {
  id: number;
  content: string;
}

export interface Meta {
  totalCount: number;
}

export interface NavIcon {
  iconImgSrc: string;
  iconAltTxt: string;
}

export interface NavLink {
  name: string;
  label: string;
  path: string;
}

export interface Advantage {
  icon: string;
  heading: string;
  text: string;
}

export interface ContactInformation {
  type: 'phone' | 'email' | 'address',
  information: string
}

export interface SocialMedia {
  icon: string,
  link: string
}

export interface FAQ {
  question: string,
  asnwer: string
}

export interface UserAccount {
  id: string,
  email: string,
  password: string,
  profile?: UserProfile
}

export type CreateUserDTO = Pick<UserAccount, 'email' | 'password'>;
export type ResponseUserDTO = Pick<UserAccount, 'id' | 'email' | 'profile'>;

export interface UserProfile {
  name?: string,
  phone?: string,
  address?: string,
}