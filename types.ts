
export enum Category {
  AI = 'AI Tools',
  WEB = 'Web Development',
  EDUCATION = 'Education',
  APP = 'Mobile Apps',
  CAREER = 'Career'
}

export interface Bundle {
  id: string;
  name: string;
  description: string;
  price: number;
  category: Category;
  image: string;
  features: string[];
}

export interface CartItem extends Bundle {
  quantity: number;
}

export interface StudentDetails {
  fullName: string;
  fatherName: string;
  dob: string;
  gender: 'Male' | 'Female' | 'Other';
  mobile: string;
  email: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
}

export interface SaleRecord {
  id: string;
  bundleName: string;
  amount: number;
  customerName: string;
  customerEmail: string;
  date: string;
  status: 'Completed' | 'Pending';
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'User';
  joinDate: string;
}
