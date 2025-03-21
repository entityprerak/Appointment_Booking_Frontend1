import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserAppointmentService } from '../../services/user-appointment.service';
import { firstValueFrom } from 'rxjs';
import { AppointmentDTO } from '../../models/appointment.dto';

@Component({
  selector: 'app-user-appointments',
  templateUrl: './user-appointments.component.html',
  styleUrls: ['./user-appointments.component.css'],
  imports: [CommonModule]
})
export class UserAppointmentsComponent implements OnInit {
  // Appointments Data
  appointments: AppointmentDTO[] = [];
  upcomingAppointments: AppointmentDTO[] = [];
  pastAppointments: AppointmentDTO[] = [];
  activeTab: 'upcoming' | 'past' = 'upcoming';

  setActiveTab(tab: 'upcoming' | 'past'): void {
    this.activeTab = tab;
  }

  constructor(private appointmentService: UserAppointmentService) {}

  ngOnInit(): void {
    this.fetchAppointments();
  }

  async fetchAppointments(): Promise<void> {
    try {
      const appointments = await firstValueFrom(this.appointmentService.getUserAppointments()) as AppointmentDTO[];
      console.log('Received appointments:', appointments);
      this.upcomingAppointments = appointments.filter(a => a.appointmentStatus === 'Upcoming');
      console.log('Received upcoming appointments:', this.upcomingAppointments);
      this.pastAppointments = appointments.filter(a => a.appointmentStatus === 'Completed');
      console.log('Received past appointments:', this.pastAppointments);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  }

  async cancelAppointment(id: number): Promise<void> {
    if (confirm('Are you sure you want to cancel this appointment?')) {
      try {
        await firstValueFrom(this.appointmentService.cancelAppointment(id));
        this.upcomingAppointments = this.upcomingAppointments.filter(a => a.id !== id);
        console.log(`Appointment ${id} cancelled successfully`);
      } catch (error) {
        console.error('Error cancelling appointment:', error);
      }
    }
  }
}

