import { Routes } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { SearchDoctorComponent } from './search-doctor/search-doctor.component';
import { BookAppointmentComponent } from './components/book-appointment/book-appointment.component';
import { DoctorRegistrationComponent } from './components/doctor-registration/doctor-registration.component';
import { AdminManageDoctorsComponent } from './components/admin-manage-doctors/admin-manage-doctors.component';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },  // Redirects to login
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegistrationComponent },
    { path: 'search-doctor', component: SearchDoctorComponent },
    {path: 'register-doctor', component: DoctorRegistrationComponent},
  { path: 'book-appointment', component: BookAppointmentComponent },
  {path: 'admin-manage-doctors',component: AdminManageDoctorsComponent},
  { path: '', redirectTo: '/search-doctor', pathMatch: 'full' }
];
