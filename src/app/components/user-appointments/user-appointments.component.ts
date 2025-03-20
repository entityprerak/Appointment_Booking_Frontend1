// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';

// interface Appointment {
//   id: number;
//   doctorName: string;
//   specialty: string;
//   date: Date;
//   time: string;
//   description: string;
//   status: 'upcoming' | 'past' | 'cancelled';
//   type: string;
// }

// @Component({
//   selector: 'app-user-appointments',
//   standalone: true,
//   imports: [CommonModule, FormsModule],
//   templateUrl: './user-appointments.component.html',
//   styleUrls: ['./user-appointments.component.css']
// })
// export class UserAppointmentsComponent implements OnInit {
//   // Tab Navigation
//   activeTab: 'upcoming' | 'past' | 'cancelled' = 'upcoming';
  
//   // Filter Dropdowns
//   showDoctorDropdown = false;
//   showDateDropdown = false;
//   showTypeDropdown = false;
  
//   // Selected Filters
//   selectedDoctor: string | null = null;
//   selectedDate: string | null = null;
//   selectedType: string | null = null;
//   searchQuery = '';
  
//   // Dropdown Options
//   doctors: string[] = ['Dr. Jane Smith', 'Dr. Robert Chen', 'Dr. Michael Johnson'];
//   appointmentTypes: string[] = ['Annual checkup', 'Follow-up', 'Initial consultation', 'Specialist referral'];
  
//   // Appointments Data
//   appointments: Appointment[] = [
//     {
//       id: 1,
//       doctorName: 'Dr. Jane Smith',
//       specialty: 'Dermatology',
//       date: new Date('2025-03-07'),
//       time: '2:00 PM',
//       description: 'Annual skin checkup',
//       status: 'upcoming',
//       type: 'Annual checkup'
//     },
//     {
//       id: 2,
//       doctorName: 'Dr. Robert Chen',
//       specialty: 'Cardiology',
//       date: new Date('2025-03-18'),
//       time: '11:00 AM',
//       description: 'Follow-up consultation',
//       status: 'upcoming',
//       type: 'Follow-up'
//     },
//     {
//       id: 3,
//       doctorName: 'Dr. Michael Johnson',
//       specialty: 'Neurology',
//       date: new Date('2025-03-27'),
//       time: '10:00 AM',
//       description: 'Initial consultation',
//       status: 'upcoming',
//       type: 'Initial consultation'
//     }
//   ];
  
//   filteredAppointments: Appointment[] = [];
  
//   ngOnInit(): void {
//     this.filterAppointments();
//   }
  
//   // Tab Methods
//   setActiveTab(tab: 'upcoming' | 'past' | 'cancelled'): void {
//     this.activeTab = tab;
//     this.filterAppointments();
//   }
  
//   // Dropdown Toggles
//   toggleDoctorDropdown(): void {
//     this.showDoctorDropdown = !this.showDoctorDropdown;
//     this.showDateDropdown = false;
//     this.showTypeDropdown = false;
//   }
  
//   toggleDateDropdown(): void {
//     this.showDateDropdown = !this.showDateDropdown;
//     this.showDoctorDropdown = false;
//     this.showTypeDropdown = false;
//   }
  
//   toggleTypeDropdown(): void {
//     this.showTypeDropdown = !this.showTypeDropdown;
//     this.showDoctorDropdown = false;
//     this.showDateDropdown = false;
//   }
  
//   // Filter Selection Methods
//   selectDoctor(doctor: string): void {
//     this.selectedDoctor = doctor === 'All Doctors' ? null : doctor;
//     this.showDoctorDropdown = false;
//     this.filterAppointments();
//   }
  
//   selectDate(date: string): void {
//     this.selectedDate = date === 'Any Date' ? null : date;
//     this.showDateDropdown = false;
//     this.filterAppointments();
//   }
  
//   selectType(type: string): void {
//     this.selectedType = type === 'Any Type' ? null : type;
//     this.showTypeDropdown = false;
//     this.filterAppointments();
//   }
  
//   // Filter Appointments
//   filterAppointments(): void {
//     this.filteredAppointments = this.appointments.filter(appointment => {
//       // Filter by tab
//       if (appointment.status !== this.activeTab) {
//         return false;
//       }
      
//       // Filter by doctor
//       if (this.selectedDoctor && appointment.doctorName !== this.selectedDoctor) {
//         return false;
//       }
      
//       // Filter by date
//       if (this.selectedDate) {
//         const today = new Date();
//         const appointmentDate = new Date(appointment.date);
        
//         if (this.selectedDate === 'Today') {
//           if (appointmentDate.toDateString() !== today.toDateString()) {
//             return false;
//           }
//         } else if (this.selectedDate === 'This Week') {
//           const weekStart = new Date(today);
//           weekStart.setDate(today.getDate() - today.getDay());
//           const weekEnd = new Date(weekStart);
//           weekEnd.setDate(weekStart.getDate() + 6);
          
//           if (appointmentDate < weekStart || appointmentDate > weekEnd) {
//             return false;
//           }
//         } else if (this.selectedDate === 'This Month') {
//           if (appointmentDate.getMonth() !== today.getMonth() || appointmentDate.getFullYear() !== today.getFullYear()) {
//             return false;
//           }
//         }
//       }
      
//       // Filter by type
//       if (this.selectedType && appointment.type !== this.selectedType) {
//         return false;
//       }
      
//       // Filter by search query
//       if (this.searchQuery.trim() !== '') {
//         const query = this.searchQuery.toLowerCase();
//         return appointment.doctorName.toLowerCase().includes(query) ||
//                appointment.specialty.toLowerCase().includes(query) ||
//                appointment.description.toLowerCase().includes(query);
//       }
      
//       return true;
//     });
//   }
  
//   // Appointment Actions
//   cancelAppointment(id: number): void {
//     const index = this.appointments.findIndex(app => app.id === id);
//     if (index !== -1) {
//       this.appointments[index].status = 'cancelled';
//       this.filterAppointments();
//       // In a real app, you would call a service to update the backend
//       console.log(`Appointment ${id} cancelled`);
//     }
//   }
  
//   rescheduleAppointment(id: number): void {
//     // In a real app, this would open a reschedule dialog
//     console.log(`Reschedule appointment ${id}`);
//   }
  
//   viewDetails(id: number): void {
//     // In a real app, this would navigate to a details page or open a dialog
//     console.log(`View details for appointment ${id}`);
//   }
  
//   getDirections(id: number): void {
//     // In a real app, this would open a map or directions page
//     console.log(`Get directions for appointment ${id}`);
//   }
  
//   bookNewAppointment(): void {
//     // In a real app, this would navigate to a booking page
//     console.log('Book new appointment');
//   }
// }

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserAppointmentService } from '../../services/user-appointment.service';
import { firstValueFrom } from 'rxjs';

interface Appointment {
  id: number;
  doctorName: string;
  specialty: string;
  date: Date;
  time: string;
  description: string;
  appointmentStatus: string; // 'Upcoming' or 'Completed'
}

@Component({
  selector: 'app-user-appointments',
  templateUrl: './user-appointments.component.html',
  styleUrls: ['./user-appointments.component.css'],
  imports: [CommonModule]
})
export class UserAppointmentsComponent implements OnInit {
  // Appointments Data
  upcomingAppointments: Appointment[] = [];
  pastAppointments: Appointment[] = [];
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
      const appointments = await firstValueFrom(this.appointmentService.getUserAppointments()) as Appointment[];
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

