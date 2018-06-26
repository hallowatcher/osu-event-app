export interface UserInfo {
  firstName: string;
  lastName: string;
  nickname: string;
  email: string;
}

export interface Payment {
  id: string;
  transactionId?: string;
  type: string;
  duration: string;
  extras?: string[];
  userInfo: UserInfo;
  status: string;
  createdOn: string;
  total?: string;
  currency?: string;
  items?: any[];
  paymentOn?: string;
  valid: boolean;
  validChanged: string;
}
