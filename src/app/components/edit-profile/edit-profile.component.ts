import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

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

  constructor(private route: ActivatedRoute, private router: Router) {
    this.route.queryParams.subscribe(params => {
      this.profile = { ...params };
      this.profileType = params['specialization'] ? 'doctor' : 'patient'; // Determine if Doctor or Patient
    });
  }

  saveChanges() {
    console.log("Updated Profile:", this.profile);
    // Redirect back to the profile page
    this.router.navigate([this.profileType === 'doctor' ? '/doctor-profile' : '/patient-profile']);
  }
}
