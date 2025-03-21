import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    try {
      // Check if sessionStorage is available (client-side only)
      if (typeof window !== 'undefined' && sessionStorage) {
        const userId = sessionStorage.getItem('userId');
        const doctorId = sessionStorage.getItem('doctorId');

        if (userId || doctorId) {
          console.log('User authenticated:', userId ? `UserId: ${userId}` : `DoctorId: ${doctorId}`);
          return true; // Allow access
        } else {
          console.warn('No userId or doctorId found in sessionStorage. Redirecting to login.');
          this.router.navigate(['/login']);
          return false;
        }
      } else {
        console.error('sessionStorage is not available. Ensure this is not running on the server side.');
        this.router.navigate(['/login']);
        return false;
      }
    } catch (error) {
      console.error('Error checking authentication:', error);
      this.router.navigate(['/login']);
      return false;
    }
  }
}