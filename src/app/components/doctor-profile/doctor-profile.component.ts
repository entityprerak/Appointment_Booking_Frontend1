import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DoctorProfileService } from '../../services/doctor-profile.service';

@Component({
  selector: 'app-doctor-profile',
  templateUrl: './doctor-profile.component.html',
  styleUrls: ['./doctor-profile.component.scss'],
})
export class DoctorProfileComponent implements OnInit {
  
  doctor: any = {};

  constructor(
    private route: ActivatedRoute,
    private doctorService: DoctorProfileService
  ) {}

  ngOnInit(): void {
    const doctorId = Number(sessionStorage.getItem('doctorId'));

    if (doctorId) {
      this.doctorService.getDoctorById(doctorId).subscribe({
        next: (data) => {
          this.doctor = data;
          console.log('Doctor data:', data);
        },
        error: (err) => {
          console.error('Error fetching doctor data:', err);
        },
      });
    } else {
      console.error('Doctor ID not found in sessionStorage.');
    }
  }
}
