
export interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  usage: string;
  benefits: string[];
  packaging: string[];
  price: string;
  image: string;
  created_at: string;
  updated_at: string;
}

export interface Comment {
  id: string;
  product_id: string;
  author: string;
  content: string;
  likes: number;
  is_admin_reply: boolean;
  created_at: string;
}

export interface ForumPost {
  id: string;
  author: string;
  title: string;
  content: string;
  category: string;
  is_answered: boolean;
  created_at: string;
}

export interface ForumReply {
  id: string;
  post_id: string;
  author: string;
  content: string;
  is_admin_reply: boolean;
  created_at: string;
}

export interface AdminUser {
  id: string;
  user_id: string;
  email: string;
  is_active: boolean;
  created_at: string;
}

// Form data interfaces for better type safety
export interface ProductFormData {
  name: string;
  category: string;
  description: string;
  usage: string;
  benefits: string;
  packaging: string;
  price: string;
  image: string;
}

export interface ReplyFormData {
  content: string;
  is_admin_reply?: boolean;
}

// API response interfaces
export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  meta: PaginationMeta;
}
