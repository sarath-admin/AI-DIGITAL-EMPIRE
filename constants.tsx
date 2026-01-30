
import { Bundle, Category } from './types';

export const COMPANY_INFO = {
  name: "AI Digital Empire",
  email: "skinfotchsolution@gmail.com",
  address: "Munnar - Udumalpet Road, near, Kanthalloor - Marayoor",
  startYear: 2025,
  developer: "Sarathkumar",
  currency: "₹",
  upiId: "kumarsarathk8@oksbi"
};

export const INITIAL_BUNDLES: Bundle[] = [
  {
    id: '1',
    name: 'AI Tools Master List',
    description: 'Comprehensive directory of 500+ AI tools for productivity, content, and automation.',
    price: 199,
    category: Category.AI,
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=800&auto=format&fit=crop',
    features: ['Lifetime Access', 'Weekly Updates', 'Tutorial Videos']
  },
  {
    id: '2',
    name: 'Website Code Bundle',
    description: '100+ Premium HTML/React templates and full stack project source codes.',
    price: 99,
    category: Category.WEB,
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=800&auto=format&fit=crop',
    features: ['Lifetime Access', 'SaaS Templates', 'Clean Documentation']
  },
  {
    id: '3',
    name: 'ENGLISH CLASS PRO',
    description: 'Complete spoken and written English mastery course from beginner to fluent.',
    price: 79,
    category: Category.EDUCATION,
    image: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=800&auto=format&fit=crop',
    features: ['Lifetime Access', 'Live Sessions', 'Grammar E-books']
  },
  {
    id: '4',
    name: 'Python Mastery Course',
    description: 'Go from zero to hero in Python. Includes AI and Data Science modules.',
    price: 299,
    category: Category.CAREER,
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=800&auto=format&fit=crop',
    features: ['Lifetime Access', 'Automation Scripts', 'Certificate Included']
  },
  {
    id: '5',
    name: 'Job Search App Bundle',
    description: 'A complete React Native application source code for a modern job board.',
    price: 49,
    category: Category.APP,
    image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=800&auto=format&fit=crop',
    features: ['Lifetime Access', 'Admin Panel Included', 'Push Notifications']
  },
  {
    id: '7',
    name: 'AI Animation video course',
    description: 'Learn to create high-quality animations using top-tier AI video generation tools.',
    price: 399,
    category: Category.AI,
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop',
    features: ['Lifetime Access', 'Step-by-step Guide', 'Resource Kit Included']
  }
];