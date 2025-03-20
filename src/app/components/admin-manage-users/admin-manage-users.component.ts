import { Component, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { ManageUserService } from '../../services/manage-user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-manage-users',
  imports: [CommonModule],
  templateUrl: './admin-manage-users.component.html',
  styleUrl: './admin-manage-users.component.css'
})
export class AdminManageUsersComponent implements OnInit{
  users: any[] = [];
  loading: boolean = false;
  errorMessage: string = '';

  constructor(private manageUserService: ManageUserService) {}

  ngOnInit(): void {
    this.fetchUsers();
  }

  async fetchUsers() {
    this.loading = true;
    try {
      this.users = await firstValueFrom(this.manageUserService.getAllUsers());
      console.log('Users fetched:', this.users);
    } catch (error) {
      console.error('Error fetching users:', error);
      this.errorMessage = 'Failed to fetch users. Please try again later.';
    } finally {
      this.loading = false;
    }
  }
}
