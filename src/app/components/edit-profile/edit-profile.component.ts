import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EditProfileService } from '../../services/edit-profile.service';
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
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private editProfileService: EditProfileService
  ) {
    this.route.queryParams.subscribe(params => {
      this.profile = { ...params };
      this.profileType = params['specialization'] ? 'doctor' : 'patient';
    });
  }

  saveChanges() {
    this.editProfileService.updateProfile(this.profile).subscribe({
      next: (response) => {
        alert('Your information was updated successfully!');
        this.router.navigate([this.profileType === 'doctor' ? '/doctor-profile' : '/patient-profile']);
      },
      error: (error) => {
        console.error('Error updating profile:', error);
        this.errorMessage = error.error || 'An error occurred during the update.';
      }
    });
  }
}
