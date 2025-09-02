import { api } from './http';

export type Rol = 'Admin' | 'Vendedor' | 'Inventario' | 'Marketing';

export interface User {
  id: number;
  nombre: string;
  email: string;
  rol: Rol;
  estado: boolean;
}

export interface LoginResponse {
  success: boolean;
  token: string;
  user: User;
  message?: string;
}

export interface AuthResponse {
  success: boolean;
  user: User;
  message?: string;
}

class AuthService {
  private readonly TOKEN_KEY = 'authToken';
  private readonly USER_KEY = 'authUser';

  // Login
  async login(email: string, password: string): Promise<LoginResponse> {
    try {
      const response = await api.post<LoginResponse>('/api/auth/login', {
        email,
        password
      });
      
      if (response.data.success) {
        this.setToken(response.data.token);
        this.setUser(response.data.user);
      }
      
      return response.data;
    } catch (error: any) {
      console.error('Error en login:', error);
      throw new Error(error.response?.data?.message || 'Error de conexión');
    }
  }

  // Logout
  logout(): void {
    this.removeToken();
    this.removeUser();
  }

  // Obtener usuario actual
  async getCurrentUser(): Promise<User | null> {
    try {
      const token = this.getToken();
      if (!token) return null;

      const response = await api.get<AuthResponse>('/api/auth/me', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.data.success) {
        this.setUser(response.data.user);
        return response.data.user;
      }
      
      return null;
    } catch (error) {
      console.error('Error al obtener usuario actual:', error);
      this.logout();
      return null;
    }
  }

  // Verificar si está autenticado
  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  // Obtener token
  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  // Establecer token
  private setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  // Remover token
  private removeToken(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  // Obtener usuario
  getUser(): User | null {
    const userStr = localStorage.getItem(this.USER_KEY);
    return userStr ? JSON.parse(userStr) : null;
  }

  // Establecer usuario
  private setUser(user: User): void {
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }

  // Remover usuario
  private removeUser(): void {
    localStorage.removeItem(this.USER_KEY);
  }

  // Verificar rol
  hasRole(role: Rol): boolean {
    const user = this.getUser();
    return user?.rol === role;
  }

  // Verificar si tiene alguno de los roles
  hasAnyRole(roles: Rol[]): boolean {
    const user = this.getUser();
    return user ? roles.includes(user.rol) : false;
  }
}

export const authService = new AuthService();
export default authService;