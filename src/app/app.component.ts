import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  sidebarOpen = false;

  constructor(private router: Router) {}

  // ✅ Method to check if current page is login or register
  isAuthPage(): boolean {
    const authRoutes = ['/login', '/register'];
    return authRoutes.includes(this.router.url);
  }

  // ✅ Sidebar toggle function
  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }
}
