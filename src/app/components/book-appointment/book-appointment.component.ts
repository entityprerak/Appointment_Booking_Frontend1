import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';  // ✅ Import FormsModule

@Component({
  selector: 'app-book-appointment',
  standalone: true,
  imports: [CommonModule, FormsModule], // ✅ Add FormsModule for ngModel support
  templateUrl: './book-appointment.component.html',
  styleUrls: ['./book-appointment.component.css']
})
export class BookAppointmentComponent {
  doctor: any = null;
  selectedDate: string = '';
  selectedTime: string = '';
  reasonForVisit: string = '';

  availableTimes: string[] = ['10:00 AM', '11:00 AM', '1:00 PM', '3:00 PM'];

  constructor(private route: ActivatedRoute, private router: Router) {
    this.route.queryParams.subscribe(params => {
      this.doctor = {
        name: params['doctor'],
        specialty: params['specialty']
      };
    });
  }

  selectTime(time: string): void {
    this.selectedTime = time;
  }

  confirmBooking(): void {
    if (!this.selectedDate || !this.selectedTime || !this.reasonForVisit) {
      alert('Please fill all details before confirming the appointment.');
      return;
    }

    alert(`Appointment booked with Dr. ${this.doctor.name} on ${this.selectedDate} at ${this.selectedTime}`);
    this.router.navigate(['/']); // Redirect after booking
  }
}
