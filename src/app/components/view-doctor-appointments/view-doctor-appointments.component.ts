import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DoctorAppointmentService } from '../../services/doctor-appointment.service';
import { firstValueFrom } from 'rxjs';
import { AppointmentDTO } from '../../models/appointment.dto';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-view-doctor-appointments',
  templateUrl: './view-doctor-appointments.component.html',
  styleUrls: ['./view-doctor-appointments.component.css'],
  imports: [CommonModule]
})
export class ViewDoctorAppointmentsComponent implements OnInit {
  activeTab: string = 'active';
  activeAppointments: AppointmentDTO[] = [];
  pastAppointments: AppointmentDTO[] = [];
  doctorId: number = 0;

  constructor(private appointmentService: DoctorAppointmentService, private router: Router) {}

  ngOnInit(): void {
    const storedDoctorId = sessionStorage.getItem('doctorId');
    if (!storedDoctorId) {
      console.error('Doctor ID not found in sessionStorage');
      this.router.navigate(['/login']);
      return;
    }
    this.doctorId = Number(storedDoctorId);

    this.fetchActiveAppointments();
    this.fetchCompletedAppointments();
  }

  async fetchActiveAppointments() {
    try {
      this.activeAppointments = await firstValueFrom(
        this.appointmentService.getActiveAppointments(this.doctorId)
      );
    } catch (error) {
      console.error('Error fetching active appointments:', error);
    }
  }

  async fetchCompletedAppointments() {
    try {
      this.pastAppointments = await firstValueFrom(
        this.appointmentService.getCompletedAppointments(this.doctorId)
      );
    } catch (error) {
      console.error('Error fetching completed appointments:', error);
    }
  }

  switchTab(tab: string) {
    this.activeTab = tab;
  }

  async completeAppointment(appointmentId: number) {
    try {
      await firstValueFrom(this.appointmentService.completeAppointment(appointmentId));
      console.log('Appointment completed successfully');
      this.fetchActiveAppointments();
      this.fetchCompletedAppointments();
    } catch (error) {
      console.error('Error completing appointment:', error);
    }
  }
}
