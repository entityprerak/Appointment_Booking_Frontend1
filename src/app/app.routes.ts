import { Routes } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { SearchDoctorComponent } from './search-doctor/search-doctor.component';
import { BookAppointmentComponent } from './components/book-appointment/book-appointment.component';
import { DoctorRegistrationComponent } from './components/doctor-registration/doctor-registration.component';
import { AdminManageDoctorsComponent } from './components/admin-manage-doctors/admin-manage-doctors.component';
import { UserAppointmentsComponent } from './components/user-appointments/user-appointments.component';
import { PatientProfileComponent } from './components/patient-profile/patient-profile.component';
import { DoctorProfileComponent } from './components/doctor-profile/doctor-profile.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { ViewDoctorAppointmentsComponent } from './view-doctor-appointments/view-doctor-appointments.component';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },  // Redirects to login
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegistrationComponent },
    { path: 'search-doctor', component: SearchDoctorComponent },
    {path: 'register-doctor', component: DoctorRegistrationComponent},
  { path: 'book-appointment', component: BookAppointmentComponent },
  {path: 'admin-manage-doctors',component: AdminManageDoctorsComponent},
  {path: 'user-appointments',component: UserAppointmentsComponent },
  {path: 'patient-profile',component: PatientProfileComponent},
  {path: 'doctor-profile',component: DoctorProfileComponent},
  {path: 'edit-profile', component:EditProfileComponent},
  {path: 'view-doctor-appointments', component:ViewDoctorAppointmentsComponent},
  { path: '', redirectTo: '/search-doctor', pathMatch: 'full' }
];
