import { Component, OnInit } from '@angular/core';
import { AdminDashboardService } from '../../services/admin-dashboard.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  totalDoctors: number = 0;
  totalUsers: number = 0;

  constructor(private adminDashboardService: AdminDashboardService) {}

  ngOnInit(): void {
    this.fetchDoctorsCount();
    this.fetchUsersCount();
  }

  async fetchDoctorsCount(): Promise<void> {
    try {
      const doctors = await firstValueFrom(this.adminDashboardService.getAllDoctors());
      this.totalDoctors = doctors.length;
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
  }

  async fetchUsersCount(): Promise<void> {
    try {
      const users = await firstValueFrom(this.adminDashboardService.getAllUsers());
      this.totalUsers = users.length;
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  }
}
