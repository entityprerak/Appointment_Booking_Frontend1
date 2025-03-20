// // import { CanActivateFn } from '@angular/router';

// // export const authGuard: CanActivateFn = (route, state) => {
// //   return true;
// // };

// import { Injectable } from '@angular/core';
// import { CanActivate, Router } from '@angular/router';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthGuard implements CanActivate {
//   constructor(private router: Router) {}

//   canActivate(): boolean {
//     const userId = sessionStorage.getItem('userId');
//     if (userId) {
//       return true; // Allow access
//     } else {
//       this.router.navigate(['/login']); // Redirect to login
//       return false;
//     }
//   }
// }

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

        if (userId) {
          console.log('User is authenticated with userId:', userId);
          return true; // Allow access
        } else {
          console.warn('No userId found in sessionStorage. Redirecting to login.');
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