import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SessionManager {
  private readonly temporaryUserName: string = 'user';
  private readonly temporaryPass: string = 'pass';

  constructor() {
    // Inicializa el estado de la sesión al cargar el servicio
    this.isLoggedIn = !!localStorage.getItem('isLoggedIn');
    this.currentUser = localStorage.getItem('currentUser');
  }

  // Almacena el estado de la sesión
  private isLoggedIn: boolean = false;
  private currentUser: string | null = null;

  performLogin(user: string, password: string): boolean {
    // Verifica si el nombre de usuario y la contraseña son correctos
    if (user === this.temporaryUserName && password === this.temporaryPass) {
      this.isLoggedIn = true;
      this.currentUser = user; // Almacena el usuario actual
      // Guarda el estado en el almacenamiento local
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('currentUser', user);
      return true;
    } else {
      this.isLoggedIn = false;
      this.currentUser = null;
      // Limpia el estado en el almacenamiento local
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('currentUser');
      return false;
    }
  }

  performLogout(): void {
    this.isLoggedIn = false;
    this.currentUser = null;
    // Limpia el estado en el almacenamiento local
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('currentUser');
  }

  getCurrentUser(): string | null {
    return this.currentUser;
  }

  isAuthenticated(): boolean {
    return this.isLoggedIn;
  }
}
