import { Routes } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';

import { BookAppointmentComponent } from './components/book-appointment/book-appointment.component';
import { DoctorRegistrationComponent } from './components/doctor-registration/doctor-registration.component';
import { AdminManageDoctorsComponent } from './components/admin-manage-doctors/admin-manage-doctors.component';
import { UserAppointmentsComponent } from './components/user-appointments/user-appointments.component';
import { PatientProfileComponent } from './components/patient-profile/patient-profile.component';
import { DoctorProfileComponent } from './components/doctor-profile/doctor-profile.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { ViewDoctorAppointmentsComponent } from './view-doctor-appointments/view-doctor-appointments.component';
import { AuthGuard } from './auth.guard';
import { DoctorLoginComponent } from './components/doctor-login/doctor-login.component';
import { SearchDoctorComponent } from './components/search-doctor/search-doctor.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { AdminManageUsersComponent } from './components/admin-manage-users/admin-manage-users.component';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },  // Redirects to login
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegistrationComponent },
    { path: 'search-doctor', component: SearchDoctorComponent },
    { path: 'login-doctor', component: DoctorLoginComponent },
    {path: 'register-doctor', component: DoctorRegistrationComponent},
  { path: 'book-appointment', component: BookAppointmentComponent },
  {path: 'admin-manage-doctors',component: AdminManageDoctorsComponent},
  {path: 'user-appointments',component: UserAppointmentsComponent },
  {path: 'patient-profile',component: PatientProfileComponent, canActivate: [AuthGuard]},
  {path: 'doctor-profile',component: DoctorProfileComponent, canActivate: [AuthGuard]},
  {path: 'edit-profile', component:EditProfileComponent},
  {path: 'view-doctor-appointments', component:ViewDoctorAppointmentsComponent},
  {path: 'admin-dashboard', component:AdminDashboardComponent},
  {path: 'admin-manage-doctors', component:AdminManageDoctorsComponent},
  {path: 'admin-manage-users', component:AdminManageUsersComponent}
  // { path: '**', redirectTo: 'login' }
  // { path: '', redirectTo: '/search-doctor', pathMatch: 'full' }
];
