import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppointmentService } from '../../services/appointment.service';
import { firstValueFrom } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-book-appointment',
  templateUrl: './book-appointment.component.html',
  styleUrls: ['./book-appointment.component.css'],
  imports: [CommonModule, FormsModule]
})
export class BookAppointmentComponent {
  doctorId: number = 0;
  specialty: string = '';
  selectedDate: string = '';
  selectedSlotId: number | null = null;
  reasonForVisit: string = '';
  availableSlots: any[] = [];

  constructor(private route: ActivatedRoute, private router: Router, private appointmentService: AppointmentService) {
    this.route.queryParams.subscribe(params => {
      this.doctorId = Number(params['doctorId']) || 0;
      this.specialty = params['specialty'] || '';
    });
  }

  async fetchSlots() {
    if (!this.selectedDate || !this.doctorId) return;
    try {
      this.availableSlots = await firstValueFrom(this.appointmentService.getAvailableSlots(this.doctorId, this.selectedDate));
    } catch (error) {
      console.error('Error fetching slots:', error);
    }
  }

  async confirmBooking() {
    if (!this.selectedDate || !this.selectedSlotId || !this.reasonForVisit) {
      alert('Please fill all details before confirming the appointment.');
      return;
    }

    const appointmentDataDTO = {
      doctorId: this.doctorId ,
      slotId: this.selectedSlotId,
      userId: Number(sessionStorage.getItem('userId')),
      date: this.selectedDate,
      problem: this.reasonForVisit
    };

    console.log('Sending Appointment Data:', appointmentDataDTO);

    try {
      await firstValueFrom(this.appointmentService.bookAppointment(appointmentDataDTO));
      alert('Appointment booked successfully!');
      this.router.navigate(['/']);
    } catch (error) {
      console.error('Error booking appointment:', error);
      alert('Failed to book the appointment. Please try again.');
    }
  }
}