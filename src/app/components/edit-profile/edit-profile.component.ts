import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class EditProfileComponent {
  profile: any = {};
  profileType: string = '';
  apiUrl = 'http://localhost:8020/user/updateuser';

  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient) {
    this.route.queryParams.subscribe(params => {
      this.profile = { ...params };
      this.profileType = params['specialization'] ? 'doctor' : 'patient'; // Determine if Doctor or Patient
    });
  }

  saveChanges() {
    console.log("Updated Profile:", this.profile);

    // Send the updated data to the backend
    this.http.put(this.apiUrl, this.profile, { responseType: 'text' }).subscribe({
      next: (response) => {
        console.log('✅ Profile updated successfully:', response);
        alert('Profile updated successfully!');
        this.router.navigate([this.profileType === 'doctor' ? '/doctor-profile' : '/patient-profile']);
      },
      error: (error) => {
        console.error('❌ Failed to update profile:', error);
        alert('Failed to update profile. Please try again.');
      }
    });

  }
}
