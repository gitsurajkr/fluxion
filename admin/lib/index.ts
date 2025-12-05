export interface AdminLoginData {
  email: string;
  password: string;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: string;
  isEmailVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AdminStats {
  users: {
    total: number;
    newToday: number;
    byDate: Record<string, number>;
    admins: number;
    regularUsers: number;
    verified: number;
    unverified: number;
  };
  orders: {
    total: number;
    today: number;
  };
  revenue: {
    total: number;
    monthly: number;
    byDate: Record<string, number>;
  };
  templates: {
    total: number;
    active: number;
    inactive: number;
  };
}

export interface AdminStatsResponse {
  message: string;
  stats: AdminStats;
}

export interface RecentOrder {
  id: string;
  userId: string;
  total: number;
  status: string;
  createdAt: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
  orderItems: Array<{
    id: string;
    quantity: number;
    tempelate: {
      title: string;
      price: number;
    };
  }>;
}

export interface RecentUser {
  id: string;
  name: string;
  email: string;
  role: string;
  isEmailVerified: boolean;
  createdAt: string;
}
