import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-book-appointment',
  templateUrl: './book-appointment.component.html',
  styleUrls: ['./book-appointment.component.scss'],
  standalone: true,
  imports: [FormsModule] // ✅ Required for [(ngModel)]
})
export class BookAppointmentComponent {
  doctor: any = null;
  selectedDate: string = '';
  selectedTime: string = '';
  reasonForVisit: string = '';

  availableTimes: string[] = ['9:00 AM', '10:30 AM', '2:00 PM', '3:30 PM'];

  constructor(private route: ActivatedRoute, private router: Router) {
    this.route.queryParams.subscribe(params => {
      this.doctor = {
        name: params['doctor'],
        specialty: params['specialty'] // ✅ This will now get the correct specialty
      };
    });
  }  

  selectTime(time: string) {
    this.selectedTime = time;
  }

  confirmBooking() {
    if (!this.selectedDate || !this.selectedTime || !this.reasonForVisit) {
      alert('Please fill all details before confirming the appointment.');
      return;
    }

    alert(`Appointment booked with Dr. ${this.doctor.name} on ${this.selectedDate} at ${this.selectedTime}`);
    this.router.navigate(['/']); // Redirect after booking
  }
}