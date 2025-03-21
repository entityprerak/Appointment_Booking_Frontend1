import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  sidebarOpen = false;
  showDropdown = false;

  constructor(private router: Router) {}

  isAuthPage(): boolean {
    const authRoutes = ['/login', '/register', '/register-doctor', '/login-doctor'];
    return authRoutes.includes(this.router.url);
  }

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

  isAdmin(): boolean {
    return sessionStorage.getItem('role') === 'ROLE_ADMIN';
  }

  isUser(): boolean {
    return sessionStorage.getItem('role') === 'ROLE_USER';
  }

  isDoctor(): boolean {
    return sessionStorage.getItem('role') === 'ROLE_DOCTOR';
  }

  toggleDropdown(): void {
    console.log('Profile icon clicked');
    this.showDropdown = !this.showDropdown;
    console.log('Dropdown state:', this.showDropdown);
  }

  logout(): void {
  
    sessionStorage.clear();

    this.router.navigate(['/login']);

    this.showDropdown = false;
    console.log('Logout successful');
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.profile-container')) {
      this.showDropdown = false;
    }
  }

}
